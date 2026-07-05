import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { LineChart, PieChart } from "@mui/x-charts";
import { useMemo, useRef } from "react";
import { useGetAllMatchesForResultQuery } from "@/entities/Match";
import { useGetCurrentSettingQuery } from "@/entities/Setting";
import { Title } from "@/entities/Title";
import { useGetResultQuery } from "@/entities/User";
import type { Result, ResultHeader } from "@/shared/api";

const DONUT_COLORS = [
	"#e53935",
	"#1e88e5",
	"#fb8c00",
	"#43a047",
	"#8e24aa",
	"#00acc1",
	"#f4511e",
	"#c0ca33",
];

const LINE_COLORS = [
	"#e53935",
	"#1e88e5",
	"#fb8c00",
	"#43a047",
	"#8e24aa",
	"#00acc1",
	"#f4511e",
	"#c0ca33",
	"#6d4c41",
	"#3949ab",
	"#d81b60",
	"#546e7a",
	"#7cb342",
	"#ffb300",
	"#5c6bc0",
];

// Сколько участников показываем на графике «Движение по местам»
// (ось Y, серии и легенда согласованы через эту константу).
const RANK_LIMIT = 10;

const PRIORITY_TABLES: Record<string, number[]> = {
	small: [50, 30, 20],
	medium: [30, 25, 20, 15, 10],
	large: [28, 22, 17, 13, 10, 6, 4],
};

function getPriorityTable(count: number): number[] {
	if (count < 15) return PRIORITY_TABLES.small;
	if (count <= 30) return PRIORITY_TABLES.medium;
	return PRIORITY_TABLES.large;
}

function distributeSecondHalf(
	results: Result[],
	secondHalf: number,
): Map<string, number> {
	const table = getPriorityTable(results.length);
	const sorted = [...results].sort((a, b) => b.pointsSum - a.pointsSum);

	const shares = new Map<string, number>();

	let ri = 0;
	while (ri < sorted.length && ri < table.length) {
		// В группу входят ВСЕ игроки с одинаковыми очками, даже если ничья
		// пересекает границу оплачиваемых мест — иначе тай-игроки за границей
		// получили бы 0, а равные им внутри — долю.
		const group: Result[] = [sorted[ri]];
		let gi = ri + 1;
		while (
			gi < sorted.length &&
			sorted[gi].pointsSum === sorted[ri].pointsSum
		) {
			group.push(sorted[gi]);
			gi++;
		}

		// Процент суммируем только по доступным ячейкам таблицы,
		// а делим на полный размер группы (доли ничьих суммируются и делятся).
		let groupPct = 0;
		for (let pi = ri; pi < ri + group.length && pi < table.length; pi++) {
			groupPct += table[pi];
		}

		const groupAmount = Math.round((secondHalf * groupPct) / 100);
		const perPlayer = Math.round(groupAmount / group.length);

		for (const p of group) {
			shares.set(p.alias, perPlayer);
		}

		ri += group.length;
	}

	return shares;
}

function calcProjectedPrizes(results: Result[], totalFund: number) {
	const half = totalFund / 2;
	const secondHalfShares = distributeSecondHalf(results, half);

	const combined = results.map((r) => {
		const won = Number(r.userPrize) || 0;
		const proj = secondHalfShares.get(r.alias) ?? 0;
		return {
			alias: r.alias,
			total: won + proj,
			alreadyWon: won,
			projected: proj,
		};
	});

	combined.sort((a, b) => b.total - a.total);

	const top = combined.slice(0, 7);
	const rest = combined.slice(7);

	type Segment = {
		id: string;
		value: number;
		label: string;
		color: string;
		won?: number;
		proj?: number;
	};

	const segments: Segment[] = top.map((p, i) => {
		const won = Math.round(Number(p.alreadyWon)) || 0;
		const proj = Math.round(Number(p.projected)) || 0;
		const totalVal = Math.max(won + proj, 0);
		return {
			id: p.alias,
			value: totalVal,
			label: p.alias,
			won,
			proj,
			color: DONUT_COLORS[i % DONUT_COLORS.length],
		};
	});

	const restSum = rest.reduce((s, p) => s + p.total, 0);
	if (restSum > 0) {
		segments.push({
			id: "others",
			value: Math.round(restSum),
			label: "Остальные",
			color: "#c8e6c9",
		});
	}

	const alreadyPaid = results.reduce(
		(s, r) => s + (Number(r.userPrize) || 0),
		0,
	);
	const undistributed = totalFund - alreadyPaid - half;
	if (undistributed > 0) {
		segments.push({
			id: "undistributed",
			value: Math.round(undistributed),
			label: "Не распределено",
			color: "#e0e0e0",
		});
	}

	return segments;
}

function calcPrizes(
	results: Result[],
	headers: ResultHeader[],
	contribution: number,
) {
	const userCount = results.length;
	const totalFund = contribution * userCount;
	const half = totalFund / 2;

	const paid = results.reduce((s, r) => s + (Number(r.userPrize) || 0), 0);

	const sorted = [...headers].sort(
		(a, b) => (a.matchNo ?? 0) - (b.matchNo ?? 0),
	);
	const lastJackpot =
		sorted.reduce((acc, m) => (m.jackpot != null ? m.jackpot : acc), 0) ?? 0;

	return {
		totalFund,
		half,
		paid,
		jackpot: lastJackpot,
		future: Math.max(0, half - paid - lastJackpot),
	};
}

function calcRankHistory(results: Result[], headers: ResultHeader[]) {
	const sortedHeaders = [...headers]
		.filter((h) => h.matchNo != null && h.homeScore != null)
		.sort((a, b) => (a.matchNo ?? 0) - (b.matchNo ?? 0));

	const resultByAlias = new Map(results.map((r) => [r.alias, r]));
	// Все участники по итоговым очкам (лучшие первыми)
	const rankedAliases = [...results]
		.sort((a, b) => b.pointsSum - a.pointsSum)
		.map((r) => r.alias);

	// Полные подписи — для тултипа, короткие (номер матча) — для делений оси X
	const matchLabels = [
		"Старт",
		...sortedHeaders.map(
			(h) =>
				`${h.home?.value ?? "?"} - ${h.away?.value ?? "?"} ${h.homeScore}:${h.awayScore}`,
		),
	];
	const shortLabels = ["Старт", ...sortedHeaders.map((h) => `${h.matchNo}`)];
	const xIndices = matchLabels.map((_, i) => i);

	// Накопительные очки и ряды рангов; все стартуют с 1 места
	const cumulative = new Map<string, number>();
	const rankData = new Map<string, (number | null)[]>();
	for (const alias of rankedAliases) {
		cumulative.set(alias, 0);
		rankData.set(alias, [1]);
	}

	for (let mi = 0; mi < sortedHeaders.length; mi++) {
		const matchNo = sortedHeaders[mi].matchNo ?? 0;

		// Инкрементально прибавляем очки текущего матча к накопленным
		const standings: { alias: string; points: number }[] = [];
		for (const alias of rankedAliases) {
			const cell = resultByAlias.get(alias)?.[matchNo];
			const points = (cumulative.get(alias) ?? 0) + (cell?.points ?? 0);
			cumulative.set(alias, points);
			standings.push({ alias, points });
		}

		standings.sort((a, b) => b.points - a.points);

		let prevPoints: number | null = null;
		let prevRank = 0;
		for (let ri = 0; ri < standings.length; ri++) {
			const entry = standings[ri];
			const rank = entry.points === prevPoints ? prevRank : ri + 1;
			const row = rankData.get(entry.alias);
			if (row) row[mi + 1] = rank;
			prevPoints = entry.points;
			prevRank = rank;
		}
	}

	// Рисуем только топ-N: остальные всё равно за пределами оси Y
	const topAliases = rankedAliases.slice(0, RANK_LIMIT);
	const series = topAliases.map((alias, i) => ({
		data: rankData.get(alias) ?? [],
		label: alias,
		color: LINE_COLORS[i % LINE_COLORS.length],
		connectNulls: true,
		showMark: false,
	}));

	return {
		series,
		xLabels: matchLabels,
		xShort: shortLabels,
		xIndices,
		allAliases: topAliases,
	};
}

function StatsPage() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const { data: results = [] } = useGetResultQuery();
	const { data: headers = [] } = useGetAllMatchesForResultQuery();
	const { data: setting } = useGetCurrentSettingQuery();

	const contribution = setting?.contribution ?? 1000;
	const chartWidth = isMobile ? 320 : 520;
	const chartHeight = isMobile ? 260 : 300;

	const prizes = useMemo(
		() => calcPrizes(results, headers, contribution),
		[results, headers, contribution],
	);

	const pieData = useMemo(
		() => [
			{
				id: "paid",
				value: Math.max(Math.round(prizes.paid), 0),
				label: "Выплачено за точный счёт",
				color: "#4caf50",
			},
			{
				id: "jackpot",
				value: Math.max(Math.round(prizes.jackpot), 0),
				label: "В джекпоте",
				color: "#ff9800",
			},
			{
				id: "future",
				value: Math.max(Math.round(prizes.future), 0),
				label: "Ожидают розыгрыша",
				color: "#2196f3",
			},
			{
				id: "secondHalf",
				value: Math.max(Math.round(prizes.half), 0),
				label: "Резерв второй половины",
				color: "#9c27b0",
			},
		],
		[prizes],
	);

	const rankHistory = useMemo(
		() => calcRankHistory(results, headers),
		[results, headers],
	);
	// ~44px на матч: при большом числе матчей график шире контейнера и
	// прокручивается по горизонтали, а подписи оси X не наезжают друг на друга.
	const rankChartWidth = Math.max(700, rankHistory.xIndices.length * 44);

	const playerPrizes = useMemo(
		() => calcProjectedPrizes(results, prizes.totalFund),
		[results, prizes.totalFund],
	);

	// Прокрутка графика мышью «схватил и потащил» (тач крутится нативно)
	const rankScrollRef = useRef<HTMLDivElement>(null);
	const rankDrag = useRef({ active: false, startX: 0, startScroll: 0 });

	const handleRankPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.pointerType !== "mouse") return;
		const el = rankScrollRef.current;
		if (!el || el.scrollWidth <= el.clientWidth) return;
		rankDrag.current = {
			active: true,
			startX: e.clientX,
			startScroll: el.scrollLeft,
		};
		el.setPointerCapture(e.pointerId);
	};

	const handleRankPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		const el = rankScrollRef.current;
		if (!rankDrag.current.active || !el) return;
		el.scrollLeft =
			rankDrag.current.startScroll - (e.clientX - rankDrag.current.startX);
	};

	const handleRankPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!rankDrag.current.active) return;
		rankDrag.current.active = false;
		rankScrollRef.current?.releasePointerCapture(e.pointerId);
	};

	return (
		<Container sx={{ mb: 5 }}>
			<Title>статистика призовых</Title>

			<Box
				display="flex"
				flexDirection={isMobile ? "column" : "row"}
				gap={3}
				alignItems="stretch"
				justifyContent="center"
			>
				<Paper
					sx={{
						p: 2,
						flex: isMobile ? "0 0 auto" : "1 1 0",
						maxWidth: isMobile ? "100%" : chartWidth + 32,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography variant="h6" gutterBottom>
						Структура призового фонда
					</Typography>
					<Typography variant="body2" color="text.secondary" gutterBottom>
						{results.length} участников × {contribution.toLocaleString()} ₽ ={" "}
						{Math.round(prizes.totalFund).toLocaleString()} ₽
					</Typography>
					<PieChart
						series={[
							{
								data: pieData,
								innerRadius: isMobile ? 40 : 60,
								outerRadius: isMobile ? 90 : 120,
								paddingAngle: 2,
								cornerRadius: 4,
								arcLabelRadius: isMobile ? 82 : 112,
								arcLabelMinAngle: 20,
								arcLabel: (item) =>
									item.value > 0 ? `${item.value.toLocaleString()} ₽` : "",
							},
						]}
						width={chartWidth}
						height={chartHeight}
						slotProps={{ legend: { hidden: true } }}
					/>
				</Paper>

				<Paper
					sx={{
						p: 2,
						flex: isMobile ? "0 0 auto" : "1 1 0",
						maxWidth: isMobile ? "100%" : chartWidth + 32,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography variant="h6" gutterBottom>
						Выигрыши по игрокам
					</Typography>
					<Typography variant="body2" color="text.secondary" gutterBottom>
						Доля каждого участника в общем фонде на данный момент
					</Typography>
					<PieChart
						series={[
							{
								data: playerPrizes,
								innerRadius: isMobile ? 40 : 60,
								outerRadius: isMobile ? 90 : 120,
								paddingAngle: 2,
								cornerRadius: 4,
								arcLabelRadius: isMobile ? 82 : 112,
								arcLabelMinAngle: 20,
								arcLabel: (item) =>
									item.id === "others" || item.id === "undistributed"
										? ""
										: (item.label as string),
								valueFormatter: (_v, ctx) => {
									const seg = playerPrizes[ctx?.dataIndex ?? -1] as
										| (typeof playerPrizes)[number]
										| undefined;
									if (seg && seg.won != null) {
										return `${seg.value.toLocaleString()} ₽ · уже ${seg.won.toLocaleString()} + прогноз ${(seg.proj ?? 0).toLocaleString()}`;
									}
									return `${(seg?.value ?? 0).toLocaleString()} ₽`;
								},
							},
						]}
						width={chartWidth}
						height={chartHeight}
						slotProps={{ legend: { hidden: true } }}
					/>
					<Box
						mt={1}
						display="flex"
						flexWrap="wrap"
						gap={1}
						justifyContent="center"
						maxWidth={chartWidth}
					>
						{playerPrizes
							.filter((s) => s.id !== "others" && s.id !== "undistributed")
							.map((s) => (
								<Box key={s.id} display="flex" alignItems="center" gap={0.5}>
									<ColorDot color={s.color} />
									<Typography variant="caption">{s.label}</Typography>
								</Box>
							))}
					</Box>
				</Paper>
			</Box>

			<Box mt={1}>
				<Paper sx={{ p: 2 }}>
					<Typography variant="h6" gutterBottom>
						Легенда
					</Typography>
					<TableContainer>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell>Часть фонда</TableCell>
									<TableCell align="right">Сумма</TableCell>
									<TableCell>Правила</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell>
										<ColorDot color="#4caf50" />
										Первая половина — точный счёт
									</TableCell>
									<TableCell align="right">
										{Math.round(prizes.half).toLocaleString()} ₽
									</TableCell>
									<TableCell>
										За каждый угаданный точный счёт. Коэффициенты: группа (1.0),
										1/16 (1.25), 1/8 (1.5), 1/4 (2.0), 1/2+3место (3.0), финал
										(4.0). Нет победителя — приз переходит на следующий матч.
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<ColorDot color="#9c27b0" />
										Вторая половина — по итоговым очкам
									</TableCell>
									<TableCell align="right">
										{Math.round(prizes.half).toLocaleString()} ₽
									</TableCell>
									<TableCell>
										Распределяется между лучшими по очкам (точный счёт — 5,
										разница — 3, исход — 1). Сетка мест зависит от числа
										участников. При равенстве очков доли суммируются и делятся.
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<ColorDot color="#ff9800" />
										Джекпот
									</TableCell>
									<TableCell align="right">
										{Math.round(prizes.jackpot).toLocaleString()} ₽
									</TableCell>
									<TableCell>
										Накопление, если точный счёт не угадал никто. После финала
										неразыгранный остаток — 13-му месту.
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Box>

			{rankHistory.series.length > 0 && (
				<Box mt={3}>
					<Paper sx={{ p: 2 }}>
						<Typography variant="h6" gutterBottom>
							Движение по местам
						</Typography>
						<Typography variant="body2" color="text.secondary" gutterBottom>
							Изменение позиций участников от матча к матчу
						</Typography>
						<Box
							display="flex"
							flexDirection={isMobile ? "column" : "row"}
							alignItems="flex-start"
						>
							<Box
								ref={rankScrollRef}
								onPointerDown={handleRankPointerDown}
								onPointerMove={handleRankPointerMove}
								onPointerUp={handleRankPointerUp}
								onPointerCancel={handleRankPointerUp}
								sx={{
									flex: 1,
									minWidth: 0,
									maxWidth: "100%",
									overflowX: "auto",
									userSelect: "none",
									cursor: "grab",
									"&:active": { cursor: "grabbing" },
								}}
							>
								<LineChart
									series={rankHistory.series}
									margin={{ left: 60, right: 20 }}
									slotProps={{
										legend: { hidden: true },
									}}
									sx={{
										// sx у LineChart навешивается прямо на <svg> (MuiChartsSurface-root),
										// который x-charts помечает touch-action: none — из-за этого свайп
										// не прокручивает контейнер. Возвращаем жесты прокрутки.
										touchAction: "pan-x pan-y !important",
									}}
									xAxis={[
										{
											data: rankHistory.xIndices,
											scaleType: "band",
											valueFormatter: (idx: number, ctx) =>
												ctx.location === "tick"
													? (rankHistory.xShort[idx] ?? "")
													: (rankHistory.xLabels[idx] ?? ""),
											tickLabelStyle: {
												fontSize: 11,
											},
										},
									]}
									yAxis={[
										{
											min: 1,
											max: RANK_LIMIT,
											reverse: true,
											label: "Место",
										},
									]}
									width={rankChartWidth}
									height={600}
								/>
							</Box>
							<Box
								flexShrink={0}
								sx={{
									ml: isMobile ? 0 : 2,
									mt: isMobile ? 1 : 4,
									width: isMobile ? "100%" : "auto",
								}}
							>
								<Typography
									variant="caption"
									fontWeight="bold"
									gutterBottom
									display="block"
								>
									Топ-{RANK_LIMIT}
								</Typography>
								<Box
									display="flex"
									flexDirection={isMobile ? "row" : "column"}
									flexWrap={isMobile ? "wrap" : "nowrap"}
									gap={isMobile ? 1 : 0}
								>
									{rankHistory.allAliases.map((alias, i) => (
										<Box
											key={alias}
											display="flex"
											alignItems="center"
											gap={0.5}
											mb={isMobile ? 0 : 0.5}
										>
											<ColorDot color={LINE_COLORS[i % LINE_COLORS.length]} />
											<Typography variant="caption">{alias}</Typography>
										</Box>
									))}
								</Box>
							</Box>
						</Box>
					</Paper>
				</Box>
			)}
		</Container>
	);
}

function ColorDot({ color }: { color: string }) {
	return (
		<Box
			component="span"
			sx={{
				display: "inline-block",
				width: 12,
				height: 12,
				borderRadius: "50%",
				bgcolor: color,
				mr: 1,
				verticalAlign: "middle",
			}}
		/>
	);
}

export default StatsPage;
