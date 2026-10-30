import { Box, useMediaQuery, useTheme } from "@mui/material";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	type MRT_TableOptions,
	useMaterialReactTable,
} from "material-react-table";
import { type FC, useMemo, useState } from "react";
import { useCompetitionId } from "@/entities/Competition";
import type { MatchStake } from "@/entities/MatchStake";
import {
	useGetAllMatchStakesQuery,
	useUpdateMatchStakeByIdMutation,
} from "@/entities/MatchStake";
import { getDefaultMRTOptions } from "@/shared/DefaultTable";
import { useAppSelector } from "@/shared/store/config";

const getErrorMessage = (data: { message: string } | string): string => {
	if (typeof data === "string") return data;
	else if ("message" in data) return data.message;
	return "error";
};

const StakeEditingTable: FC = () => {
	const muiTheme = useTheme();
	const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
	const theme = useAppSelector((state) => state.theme);
	const competitionId = useCompetitionId();
	const { data: respondedStakes, isLoading } = useGetAllMatchStakesQuery(
		competitionId,
		{ skip: competitionId === undefined },
	);
	const [updateStake] = useUpdateMatchStakeByIdMutation();
	const [validationErrors, setValidationErrors] = useState("");
	const handleSaveStake: MRT_TableOptions<MatchStake>["onEditingRowSave"] =
		async ({ values, row, table }) => {
			const result = await updateStake({
				id: row.original.id,
				competitionId,
				homeScore: Number(values["stake.homeScore"]),
				awayScore: Number(values["stake.awayScore"]),
			});
			if ("data" in result) {
				table.setEditingRow(null);
			} else if ("error" in result) {
				if ("data" in result.error) {
					setValidationErrors(
						getErrorMessage(result.error.data as { message: string } | string),
					);
				}
			}
		};
	const matchStakes: MatchStake[] = respondedStakes || [];
	const columns = useMemo<MRT_ColumnDef<MatchStake>[]>(
		() => [
			{
				accessorKey: "id",
				header: "id",
				enableEditing: false,
				visibleInShowHideMenu: false,
				Edit: () => null,
			},
			{
				accessorKey: "matchNo",
				enableEditing: false,
				header: "#",
				minSize: 20,
				maxSize: 40,
				size: 30,
			},
			{
				accessorKey: "home.value",
				enableEditing: false,
				header: "хозяева",
				muiTableBodyCellProps: {
					align: "left",
				},
			},
			{
				accessorKey: "stake.homeScore",
				header: "",
				muiEditTextFieldProps: {
					type: "number",
					error: !!validationErrors,
					helperText: validationErrors,
				},
			},
			{
				accessorKey: "stake.awayScore",
				header: "",
				muiEditTextFieldProps: {
					type: "number",
					error: !!validationErrors,
					helperText: validationErrors,
				},
			},
			{
				accessorKey: "away.value",
				header: "гости",
				enableEditing: false,
			},
		],
		[validationErrors],
	);
	const defaultMRTOptions = getDefaultMRTOptions<MatchStake>();
	const table = useMaterialReactTable({
		...defaultMRTOptions,
		editDisplayMode: isMobile ? "modal" : "row",
		enableEditing: (row) => row.original.enable,
		columns,
		data: matchStakes,
		state: {
			isLoading,
		},
		autoResetPageIndex: false,
		enableExpandAll: true,
		getRowId: (row) => row.id?.toString(),
		onEditingRowSave: handleSaveStake,
		renderDetailPanel: ({ row }) =>
			row.original.homeScore !== null && row.original.awayScore !== null ? (
				<Box ml={12}>
					Матч сыгран, счёт {row.original.homeScore} : {row.original.awayScore}
				</Box>
			) : null,
		onEditingRowCancel: () => setValidationErrors(""),
		muiTableBodyRowProps: ({ row, table }) => ({
			onDoubleClick: () => {
				if (row.original.enable) {
					table.setEditingRow(row);
				}
			},
			sx: row.original.enable
				? { cursor: "pointer" }
				: { cursor: "default", opacity: 0.5 },
		}),
		displayColumnDefOptions: {
			"mrt-row-actions": {
				header: "",
				visibleInShowHideMenu: false, //hide the built-in row actions column from the show hide menu
			},
		},
		initialState: {
			columnVisibility: {
				id: false,
			},
			pagination: { pageSize: theme.rowsOnPage, pageIndex: 0 },
		},
	});
	return <MaterialReactTable table={table} />;
};

export { StakeEditingTable };
