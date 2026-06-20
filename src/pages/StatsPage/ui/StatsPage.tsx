import { useMemo } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { PieChart, LineChart } from '@mui/x-charts';
import { Title } from '@/entities/Title';
import { useGetResultQuery } from '@/entities/User';
import { useGetAllMatchesForResultQuery } from '@/entities/Match';
import { useGetAllSettingsQuery } from '@/entities/Setting';
import type { Result, ResultHeader } from '@/shared/api';

const DONUT_COLORS = [
    '#e53935',
    '#1e88e5',
    '#fb8c00',
    '#43a047',
    '#8e24aa',
    '#00acc1',
    '#f4511e',
    '#c0ca33',
];

const LINE_COLORS = [
    '#e53935',
    '#1e88e5',
    '#fb8c00',
    '#43a047',
    '#8e24aa',
    '#00acc1',
    '#f4511e',
    '#c0ca33',
    '#6d4c41',
    '#3949ab',
    '#d81b60',
    '#546e7a',
    '#7cb342',
    '#ffb300',
    '#5c6bc0',
];

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
    const sorted = [...results].sort(
        (a, b) => b.pointsSum - a.pointsSum,
    );

    const shares = new Map<string, number>();

    let ri = 0;
    while (ri < sorted.length && ri < table.length) {
        const group: Result[] = [sorted[ri]];
        let gi = ri + 1;
        while (
            gi < sorted.length &&
            sorted[gi].pointsSum === sorted[ri].pointsSum &&
            gi < table.length
        ) {
            group.push(sorted[gi]);
            gi++;
        }

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

function calcProjectedPrizes(
    results: Result[],
    totalFund: number,
) {
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

    const segments = top.map((p, i) => {
        const won = Math.round(Number(p.alreadyWon)) || 0;
        const proj = Math.round(Number(p.projected)) || 0;
        const totalVal = Math.max(won + proj, 0);
        return {
            id: p.alias,
            value: totalVal,
            label: `уже ${won.toLocaleString()} ₽ + прогноз ${proj.toLocaleString()} ₽`,
            color: DONUT_COLORS[i % DONUT_COLORS.length],
        };
    });

    const restSum = rest.reduce((s, p) => s + p.total, 0);
    if (restSum > 0) {
        segments.push({
            id: 'others',
            value: Math.round(restSum),
            label: 'Остальные',
            color: '#c8e6c9',
        });
    }

    const alreadyPaid = results.reduce((s, r) => s + (Number(r.userPrize) || 0), 0);
    const undistributed = totalFund - alreadyPaid - half;
    if (undistributed > 0) {
        segments.push({
            id: 'undistributed',
            value: Math.round(undistributed),
            label: 'Не распределено',
            color: '#e0e0e0',
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

    const userAliases = results
        .map((r) => r.alias)
        .sort((a, b) => (results.find((r) => r.alias === b)?.pointsSum ?? 0) - (results.find((r) => r.alias === a)?.pointsSum ?? 0));

    const topUsers = userAliases.slice(0, 15);
    const matchLabels = ['Старт', ...sortedHeaders.map((h) => `#${h.matchNo}`)];

    const rankData: { [alias: string]: (number | null)[] } = {};
    for (const alias of topUsers) {
        rankData[alias] = [1];
    }

    for (let mi = 0; mi < sortedHeaders.length; mi++) {
        const m = sortedHeaders[mi];
        const matchNo = m.matchNo!;

        const cumulativePoints: { alias: string; points: number }[] = [];
        for (const alias of topUsers) {
            const user = results.find((r) => r.alias === alias);
            if (!user) continue;
            let total = 0;
            for (let j = 0; j <= mi; j++) {
                const pm = sortedHeaders[j];
                const cell = user[pm.matchNo!];
                total += cell?.points ?? 0;
            }
            cumulativePoints.push({ alias, points: total });
        }

        cumulativePoints.sort((a, b) => b.points - a.points);

        let prevPoints: number | null = null;
        let prevRank = 0;
        for (let ri = 0; ri < cumulativePoints.length; ri++) {
            const entry = cumulativePoints[ri];
            const rank =
                entry.points === prevPoints ? prevRank : ri + 1;
            rankData[entry.alias][mi + 1] = rank;
            prevPoints = entry.points;
            prevRank = rank;
        }
    }

    const series = topUsers.map((alias, i) => ({
        data: rankData[alias],
        label: alias,
        color: LINE_COLORS[i % LINE_COLORS.length],
        connectNulls: true,
        showMark: false,
    }));

    return { series, xLabels: matchLabels };
}

function StatsPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { data: results = [] } = useGetResultQuery();
    const { data: headers = [] } = useGetAllMatchesForResultQuery();
    const { data: settingsList = [] } = useGetAllSettingsQuery();

    const contribution = settingsList[0]?.contribution ?? 1000;
    const chartWidth = isMobile ? 320 : 500;
    const chartWidthFund = isMobile ? chartWidth : 650;
    const chartHeight = isMobile ? 260 : 300;

    const prizes = useMemo(
        () => calcPrizes(results, headers, contribution),
        [results, headers, contribution],
    );

    const pieData = useMemo(
        () => [
            {
                id: 'paid',
                value: Math.max(Math.round(prizes.paid), 0),
                label: 'Выплачено за точный счёт',
                color: '#4caf50',
            },
            {
                id: 'jackpot',
                value: Math.max(Math.round(prizes.jackpot), 0),
                label: 'В джекпоте',
                color: '#ff9800',
            },
            {
                id: 'future',
                value: Math.max(Math.round(prizes.future), 0),
                label: 'Ожидают розыгрыша',
                color: '#2196f3',
            },
            {
                id: 'secondHalf',
                value: Math.max(Math.round(prizes.half), 0),
                label: 'Резерв второй половины',
                color: '#9c27b0',
            },
        ],
        [prizes],
    );

    const rankHistory = useMemo(
        () => calcRankHistory(results, headers),
        [results, headers],
    );

    const playerPrizes = useMemo(
        () => calcProjectedPrizes(results, prizes.totalFund),
        [results, prizes.totalFund],
    );

    return (
        <Container sx={{ mb: 5 }}>
            <Title>статистика призовых</Title>

            <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'}
                gap={3}
                alignItems="flex-start"
                justifyContent="center"
            >
                <Paper sx={{ p: 2, flex: '0 0 auto' }}>
                    <Typography variant="h6" gutterBottom>
                        Структура призового фонда
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        {results.length} участников ×{' '}
                        {contribution.toLocaleString()} ₽ ={' '}
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
                                    item.value > 0
                                        ? `${item.value.toLocaleString()} ₽`
                                        : '',
                            },
                        ]}
                        width={chartWidthFund}
                        height={chartHeight}
                        slotProps={{ legend: { hidden: true } }}
                    />
                </Paper>

                <Paper sx={{ p: 2, flex: '0 0 auto' }}>
                    <Typography variant="h6" gutterBottom>
                        Выигрыши по игрокам
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
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
                                    item.id === 'others' || item.id === 'undistributed'
                                        ? ''
                                        : (item.id as string),
                                valueFormatter: (v: any) =>
                                    `${(Number(v?.value ?? v) || 0).toLocaleString()} ₽`,
                            },
                        ]}
                        width={chartWidth}
                        height={chartHeight}
                        slotProps={{ legend: { hidden: true } }}
                    />
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
                                        За каждый угаданный точный счёт.
                                        Коэффициенты: группа (1.0), 1/16 (1.25),
                                        1/8 (1.5), 1/4 (2.0), 1/2+3место (3.0),
                                        финал (4.0). Нет победителя — приз
                                        переходит на следующий матч.
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <ColorDot color="#9c27b0" />
                                        Вторая половина — по итоговым
                                        очкам
                                    </TableCell>
                                    <TableCell align="right">
                                        {Math.round(prizes.half).toLocaleString()} ₽
                                    </TableCell>
                                    <TableCell>
                                        Распределяется между лучшими по очкам
                                        (точный счёт — 5, разница — 3, исход —
                                        1). Сетка мест зависит от числа
                                        участников. При равенстве очков доли
                                        суммируются и делятся.
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <ColorDot color="#ff9800" />
                                        Джекпот
                                    </TableCell>
                                    <TableCell align="right">
                                        {Math.round(
                                            prizes.jackpot,
                                        ).toLocaleString()}{' '}
                                        ₽
                                    </TableCell>
                                    <TableCell>
                                        Накопление, если точный счёт не угадал
                                        никто. После финала неразыгранный
                                        остаток — 13-му месту.
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            {rankHistory.series.length > 0 && !isMobile && (
                <Box mt={3}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Движение по местам
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Изменение позиций участников (топ-15) от матча к
                            матчу
                        </Typography>
                        <LineChart
                            series={rankHistory.series}
                            xAxis={[
                                {
                                    data: rankHistory.xLabels,
                                    scaleType: 'band',
                                    tickLabelStyle: {
                                        angle: 60,
                                        fontSize: 10,
                                    },
                                },
                            ]}
                            yAxis={[
                                {
                                    min: 1,
                                    max: Math.min(rankHistory.series.length, 15),
                                    reverse: true,
                                    label: 'Место',
                                },
                            ]}
                            width={isMobile ? 340 : 1100}
                            height={400}
                        />
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
                display: 'inline-block',
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: color,
                mr: 1,
                verticalAlign: 'middle',
            }}
        />
    );
}

export default StatsPage;
