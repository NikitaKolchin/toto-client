import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import {
	MaterialReactTable,
	type MRT_Cell,
	type MRT_ColumnDef,
	type MRT_VisibilityState,
	useMaterialReactTable,
} from "material-react-table";
import { type FC, useEffect, useMemo, useState } from "react";
import { useCompetitionId } from "@/entities/Competition";
import { useGetAllMatchesForResultQuery } from "@/entities/Match";
import { useGetResultQuery } from "@/entities/User";
import type { Result } from "@/shared/api";
import { getDefaultMRTOptions } from "@/shared/DefaultTable";
import { useAppSelector } from "@/shared/store/config";

const formatDate = (date: string) => {
	return dayjs(date).format("DD.MM.YYYY HH:mm");
};

const ResultTable: FC = () => {
	const theme = useAppSelector((state) => state.theme);
	const competitionId = useCompetitionId();
	const matchThen600 = useMediaQuery(useTheme().breakpoints.up("sm"));
	const { data: respondedMatches, isLoading } = useGetAllMatchesForResultQuery(
		competitionId,
		{
			skip: competitionId === undefined,
		},
	);
	const { data: result } = useGetResultQuery(competitionId, {
		skip: competitionId === undefined,
	});
	const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
		{},
	);
	const dayMinusOne = (date: string) =>
		new Date(new Date(date).setDate(new Date(date).getDate() + 1));
	useEffect(() => {
		setColumnVisibility(
			(respondedMatches || []).reduce<MRT_VisibilityState>((acc, value) => {
				acc[`${value.matchNo.toString()}`] =
					dayMinusOne(value.date) > new Date();
				return acc;
			}, {}),
		);
	}, [respondedMatches]);
	const additionalHeaders: MRT_ColumnDef<Result>[] = useMemo(
		() => [
			{
				accessorKey: "place",
				header: "#",
			},
			{
				accessorKey: "alias",
				header: "имя",
				maxSize: 60,
				muiTableBodyCellProps: {
					sx: {
						textAlign: "left",
						fontWeight: 700,
					},
				},
			},
			{
				accessorKey: "userPrize",
				header: "выиграно, ₽",
				Cell: ({ cell }: { cell: MRT_Cell<Result, unknown> }) =>
					Math.round(cell.getValue<number>()),
			},
			{
				accessorKey: "pointsSum",
				header: "очки",
			},
		],
		[],
	);
	const headers: MRT_ColumnDef<Result>[] = useMemo(
		() => [
			...additionalHeaders,
			...(respondedMatches || []).map((match) => ({
				accessorKey: `${match.matchNo.toString()}`,
				header: `${match.matchNo.toString()}`,
				Header: () => (
					<Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
						<Typography fontWeight={700}>
							{match.home?.value && match.away?.value && (
								<>{`${match.home?.value} - ${match.away?.value}`}</>
							)}
						</Typography>
						{match.stat?.homeStakes !== undefined ? (
							<>
								{" "}
								<Typography>
									{match.homeScore !== null && match.awayScore !== null && (
										<b>{` ${match.homeScore} - ${match.awayScore} `}</b>
									)}
									{` (🏆 ${match.prize ?? ""} ₽)`}
								</Typography>
								<Typography>
									{match.stat?.homeStakes !== undefined &&
										match.stat?.drawStakes !== undefined &&
										match.stat?.awayStakes !== undefined && (
											<>
												{" "}
												{`📈${match.stat?.homeStakes} - ${match.stat?.drawStakes} - ${match.stat?.awayStakes}`}
											</>
										)}
									{` (🎰 ${match.jackpot ?? ""} ₽)`}
								</Typography>
							</>
						) : match.prize !== null && match.jackpot !== null ? (
							<Typography>{` (🏆 ${match.prize} ₽ ;🎰 ${match.jackpot} ₽ )`}</Typography>
						) : (
							<></>
						)}
						<Typography>📅{formatDate(match.date)}</Typography>
					</Box>
				),
				Cell: ({ cell }: { cell: MRT_Cell<Result, unknown> }) =>
					cell.getValue<Result[number]>()?.stake && (
						<>
							{cell.getValue<Result[number]>()?.stake}{" "}
							{cell.getValue<Result[number]>()?.points ? (
								<>
									{" "}
									{`(${cell.getValue<Result[number]>()?.points}`}
									{cell.getValue<Result[number]>()?.money ? (
										<>{`; ${Math.round(
											cell.getValue<Result[number]>()?.money ?? 0,
										)}₽)`}</>
									) : (
										<>{")"}</>
									)}
								</>
							) : (
								<></>
							)}
						</>
					),
			})),
		],
		[additionalHeaders, respondedMatches],
	);
	const userResults = result || [];
	const columns = useMemo<MRT_ColumnDef<Result>[]>(() => headers, [headers]);
	const defaultMRTOptions = getDefaultMRTOptions<Result>();
	const table = useMaterialReactTable({
		...defaultMRTOptions,
		enableColumnPinning: true,
		enableEditing: false,
		columns,
		data: userResults,
		state: {
			isLoading,
			columnVisibility: {
				place: matchThen600,
				...columnVisibility,
			},
		},
		onColumnVisibilityChange: setColumnVisibility,
		autoResetPageIndex: false,
		getRowId: (row) => row.alias,
		initialState: {
			columnVisibility: {
				place: matchThen600,
			},
			columnPinning: { left: ["alias"] },
			pagination: { pageSize: theme.rowsOnPage, pageIndex: 0 },
			sorting: [
				{
					id: "pointsSum",
					desc: true,
				},
				{
					id: "userPrize",
					desc: true,
				},
				{
					id: "alias",
					desc: false,
				},
			],
		},
		muiTableBodyCellProps: ({ cell }) => ({
			sx: {
				textAlign: "center",
				backgroundColor:
					cell.getValue<Result[number]>()?.color ?? "transparent",
			},
		}),
		displayColumnDefOptions: {
			"mrt-row-actions": {
				header: "",
			},
		},
	});
	return <MaterialReactTable table={table} />;
};

export { ResultTable };
