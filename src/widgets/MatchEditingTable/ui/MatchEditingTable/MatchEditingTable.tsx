import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Checkbox, IconButton, Tooltip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	type MRT_Row,
	type MRT_TableOptions,
	useMaterialReactTable,
} from "material-react-table";
import { type FC, useMemo } from "react";
import { useCompetitionId } from "@/entities/Competition";
import {
	useAddMatchMutation,
	useDeleteMatchMutation,
	useGetAllMatchesQuery,
	useUpdateMatchByIdMutation,
	useUploadMatchesMutation,
} from "@/entities/Match";
import { useUpdateStakesResultMutation } from "@/entities/MatchStake";
import { useGetTeamsByCompetitionQuery } from "@/entities/Team";
import type { Match } from "@/shared/api";
import { trueFalse } from "@/shared/const/select";
import { getDefaultMRTOptions } from "@/shared/DefaultTable";
import { useAppSelector } from "@/shared/store/config";
import { ShowMessage } from "@/shared/ui/ShowMessage";

const MatchEditingTable: FC = () => {
	const theme = useAppSelector((state) => state.theme);
	const competitionId = useCompetitionId();
	const { roles } = useAppSelector((state) => state.user);
	const isAdmin = roles.find((role) => role.value === "ADMIN") !== undefined;
	const [
		uploadMatches,
		{
			isLoading: isLoadingUploadMatches,
			data: uploadMatchesResult,
			error: uploadMatchesError,
		},
	] = useUploadMatchesMutation();
	const {
		data: respondedMatches,
		isLoading,
		refetch: refetchMatches,
	} = useGetAllMatchesQuery(competitionId, {
		skip: competitionId === undefined,
	});
	const { data: competitionTeams = [] } = useGetTeamsByCompetitionQuery(
		competitionId ?? 0,
		{ skip: competitionId === undefined },
	);
	const [
		updateResults,
		{
			isLoading: isLoadingResults,
			error: updateResultsError,
			data: updateResultsData,
		},
	] = useUpdateStakesResultMutation();
	const [updateMatch] = useUpdateMatchByIdMutation();
	const [addMatch] = useAddMatchMutation();
	const [deleteMatch] = useDeleteMatchMutation();
	const getScore = (score: string) =>
		score === "" || score === null ? null : Number(score);

	const handleSaveMatch: MRT_TableOptions<Match>["onEditingRowSave"] = async ({
		values,
		table,
	}) => {
		if (competitionId === undefined) return;
		const {
			id,
			awayScore,
			coefficient,
			date,
			enable,
			homeScore,
			matchNo,
			visibility,
		} = values;
		await updateMatch({
			id,
			competitionId,
			awayScore: getScore(awayScore),
			homeScore: getScore(homeScore),
			coefficient: Number(coefficient),
			date,
			matchNo: Number(matchNo),
			enable: Boolean(enable),
			visibility: Boolean(visibility),
			homeId: Number(
				competitionTeams.find((team) => team.value === values["home.value"])
					?.id,
			),
			awayId: Number(
				competitionTeams.find((team) => team.value === values["away.value"])
					?.id,
			),
		});
		table.setEditingRow(null); //exit editing mode
	};

	const handleCreateMatch: MRT_TableOptions<Match>["onCreatingRowSave"] =
		async ({ values, table }) => {
			if (competitionId === undefined) return;
			const {
				awayScore,
				coefficient,
				date,
				enable,
				homeScore,
				matchNo,
				visibility,
			} = values;
			await addMatch({
				awayScore: getScore(awayScore),
				homeScore: getScore(homeScore),
				coefficient: Number(coefficient),
				date,
				matchNo: Number(matchNo),
				enable: Boolean(enable),
				visibility: Boolean(visibility),
				homeId: Number(
					competitionTeams.find((team) => team.value === values["home.value"])
						?.id,
				),
				awayId: Number(
					competitionTeams.find((team) => team.value === values["away.value"])
						?.id,
				),
				competitionId,
				prize: null,
				jackpot: null,
			});
			table.setCreatingRow(null); //exit creating mode
		};
	const openDeleteConfirmModal = (row: MRT_Row<Match>) => {
		if (
			window.confirm("Are you sure you want to delete this match?") &&
			competitionId !== undefined
		) {
			deleteMatch({ id: row.original.id, competitionId });
		}
	};
	const matches: Match[] = respondedMatches || [];
	const teams = competitionTeams.map((team) => team.value);
	const columns = useMemo<MRT_ColumnDef<Match>[]>(
		() => [
			{
				accessorKey: "id",
				header: "id",
				Edit: () => null,
				enableEditing: false,
			},
			{
				accessorKey: "matchNo",
				header: "#",
			},
			{
				accessorKey: "home.value",
				header: "хозяева",
				editVariant: "select",
				editSelectOptions: teams,
			},
			{
				accessorKey: "homeScore",
				header: "",
				muiEditTextFieldProps: {
					type: "number",
				},
			},
			{
				accessorKey: "awayScore",
				header: "",
				muiEditTextFieldProps: {
					type: "number",
				},
			},
			{
				accessorKey: "away.value",
				header: "гости",
				editVariant: "select",
				editSelectOptions: teams,
			},
			{
				accessorFn: (row) => new Date(row.date),
				id: "date",
				Cell: ({ cell }) =>
					dayjs(cell.getValue<Date>())?.format("DD.MM.YYYY HH:mm"),
				header: "дата",
				Edit: ({ column, row }) => (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							onChange={(newValue) => {
								row._valuesCache[column.id] = dayjs(newValue);
							}}
							ampm={false}
							label={column.columnDef.header}
							value={dayjs(row.getValue<Date>(column.id))}
							format="DD.MM.YYYY HH:mm"
							slotProps={{
								textField: {
									variant: "standard",
									required: true,
								},
							}}
						/>
					</LocalizationProvider>
				),
			},
			{
				accessorKey: "coefficient",
				header: "коэффициент",
			},
			{
				accessorKey: "enable",
				header: "enable",
				editVariant: "select",
				editSelectOptions: trueFalse,
				Cell: ({ row }) => (
					<Checkbox
						key={`enable${row.id}`}
						disabled
						checked={row.original.enable}
					/>
				),
			},
			{
				accessorKey: "visibility",
				header: "visibility",
				editVariant: "select",
				editSelectOptions: trueFalse,
				Cell: ({ row }) => (
					<Checkbox
						key={`visibility${row.id}`}
						disabled
						checked={row.original.visibility}
					/>
				),
			},
			{
				accessorKey: "prize",
				header: "Стоимость",
				enableEditing: false,
			},
			{
				accessorKey: "jackpot",
				header: "Джэкпот",
				enableEditing: false,
			},
		],
		[teams],
	);
	const defaultMRTOptions = getDefaultMRTOptions<Match>();
	const table = useMaterialReactTable({
		...defaultMRTOptions,
		enableEditing: isAdmin,
		columns,
		data: matches,
		state: {
			isLoading,
		},
		createDisplayMode: "modal",
		renderTopToolbarCustomActions: ({ table }) =>
			isAdmin ? (
				<Box>
					<Box display={"flex"} justifyContent={"flex-start"}>
						<Button
							sx={{ mr: 1 }}
							variant="contained"
							onClick={() => {
								table.setCreatingRow(true);
							}}
							disabled={competitionId === undefined}
						>
							Добавить матч
						</Button>{" "}
						<Button
							sx={{ mr: 1 }}
							variant="contained"
							onClick={async () => {
								// Пересчёт меняет призы и джекпоты матчей — перечитываем таблицу.
								const result = await updateResults(competitionId);
								if ("data" in result) refetchMatches();
							}}
							disabled={isLoadingResults || competitionId === undefined}
						>
							Обновить результаты
						</Button>
						<Button
							variant="contained"
							onClick={() => uploadMatches(competitionId)}
							disabled={isLoadingUploadMatches || competitionId === undefined}
						>
							Загрузить матчи
						</Button>
					</Box>
					{(uploadMatchesResult || uploadMatchesError) && (
						<ShowMessage
							error={uploadMatchesError}
							message={uploadMatchesResult?.message}
							severity="info"
						/>
					)}
					{(updateResultsData || updateResultsError) && (
						<ShowMessage
							error={updateResultsError}
							message={updateResultsData?.message}
							severity="info"
						/>
					)}
				</Box>
			) : (
				<></>
			),
		autoResetPageIndex: false,
		getRowId: (row) => row.id?.toString(),
		onEditingRowSave: handleSaveMatch,
		// onCreatingRowCancel: () => setValidationErrors({}),
		onCreatingRowSave: handleCreateMatch,
		initialState: {
			columnVisibility: {
				id: false,
				prize: false,
				jackpot: false,
			},
			pagination: { pageSize: theme.rowsOnPage, pageIndex: 0 },
		},
		renderRowActions: ({ row, table }) => (
			<Box sx={{ display: "flex", gap: "1rem" }}>
				<Tooltip title="Редактировать">
					<IconButton onClick={() => table.setEditingRow(row)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Удалить">
					<IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			</Box>
		),
		displayColumnDefOptions: {
			"mrt-row-actions": {
				header: "",
			},
		},
	});
	return <MaterialReactTable table={table} />;
};

export { MatchEditingTable };
