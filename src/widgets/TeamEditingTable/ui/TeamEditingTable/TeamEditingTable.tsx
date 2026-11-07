/* eslint-disable react/jsx-pascal-case */

import { Box, Button, Typography } from "@mui/material";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	MRT_GlobalFilterTextField,
	type MRT_TableOptions,
	MRT_ToggleFiltersButton,
	useMaterialReactTable,
} from "material-react-table";
import { type FC, useMemo, useState } from "react";
import {
	useCompetitionId,
	useGetAllCompetitionsQuery,
} from "@/entities/Competition";
import {
	useGetAllTeamsQuery,
	useUpdateTeamByIdMutation,
	useUpdateTeamsMutation,
	useUploadTeamsMutation,
} from "@/entities/Team";
import { EditMultipleValueRow } from "@/features/EditMultipleValueRow";
import type { Competition, Team } from "@/shared/api";
import { getDefaultMRTOptions } from "@/shared/DefaultTable";
import { ShowMessage } from "@/shared/ui/ShowMessage";

const validateRequired = (value: string) => !!value.length;

function validateTeam(team: Team) {
	return {
		firstName: !validateRequired(team.value) ? "Value is Required" : "",
	};
}

const TeamEditingTable: FC = () => {
	const competitionId = useCompetitionId();
	const { data: respondedTeams, isLoading } = useGetAllTeamsQuery();
	const [
		uploadTeams,
		{
			isLoading: isLoadingUploadTeams,
			error: uploadTeamsError,
			data: uploadTeamsData,
		},
	] = useUploadTeamsMutation();
	const [
		updateTeams,
		{
			isLoading: isLoadingUpdateTeams,
			error: updateTeamsError,
			data: updateTeamsData,
		},
	] = useUpdateTeamsMutation();
	const [updateTeam] = useUpdateTeamByIdMutation();
	const { data: respondedCompetitions, isLoading: isLoadingCompetitions } =
		useGetAllCompetitionsQuery();
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string | undefined>
	>({});

	const handleSaveTeam: MRT_TableOptions<Team>["onEditingRowSave"] = async ({
		values,
		table,
	}) => {
		const newValidationErrors = validateTeam(values);
		if (Object.values(newValidationErrors).some((error) => error)) {
			setValidationErrors(newValidationErrors);
			return;
		}
		setValidationErrors({});
		await updateTeam(values);
		table.setEditingRow(null); //exit editing mode
	};
	const teams: Team[] = respondedTeams || [];
	const columns = useMemo<MRT_ColumnDef<Team>[]>(
		() => [
			{
				accessorKey: "id",
				header: "id",
				enableEditing: false,
			},
			{
				accessorKey: "value",
				header: "value",
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.firstName,
					helperText: validationErrors?.firstName,
					//remove any previous validation errors when team focuses on the input
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							firstName: undefined,
						}),
					//optionally add validation checking for onBlur or onChange
				},
			},
			{
				accessorKey: "description",
				header: "description",
				enableEditing: false,
			},
			{
				accessorKey: "competitions",
				header: "competitions",
				filterVariant: "select",
				filterSelectOptions: respondedCompetitions,
				filterFn: "competitionsFilter",
				Cell: ({ cell }) =>
					cell
						.getValue<Competition[]>()
						.map((competition) => (
							<Typography
								key={competition.id}
							>{`${competition.value}\n`}</Typography>
						)),
				Edit: ({ column, row }) =>
					EditMultipleValueRow<Team>({
						column,
						row,
						data: respondedCompetitions,
						isLoading: isLoadingCompetitions,
					}),
			},
		],
		[isLoadingCompetitions, respondedCompetitions, validationErrors],
	);
	const defaultMRTOptions = getDefaultMRTOptions<Team>();
	const table = useMaterialReactTable({
		...defaultMRTOptions,
		columns,
		data: teams,
		state: {
			isLoading,
		},
		autoResetPageIndex: false,
		getRowId: (row) => row.id,
		onEditingRowSave: handleSaveTeam,
		onEditingRowCancel: () => setValidationErrors({}),
		filterFns: {
			competitionsFilter: (row, columnId, filterValue) =>
				row.original.competitions.find(
					(competition: Competition) => competition.value === filterValue,
				) !== undefined,
		},
		columnFilterDisplayMode: "popover",
		initialState: {
			columnVisibility: {
				firstName: false,
				secondName: false,
				id: false,
			},
		},
		renderTopToolbar: ({ table }) => {
			// Команды загружаются из API в выбранный в шапке турнир.
			const handleUpload = () => {
				if (competitionId !== undefined) uploadTeams(competitionId);
			};
			const handleUpdate = () => {
				if (competitionId !== undefined) updateTeams(competitionId);
			};
			return (
				<Box
					sx={() => ({
						display: "flex",
						gap: "0.5rem",
						p: "8px",
						justifyContent: "space-between",
					})}
				>
					<Box
						sx={{
							display: "flex",
							gap: "0.5rem",
							alignItems: "center",
						}}
					>
						<MRT_GlobalFilterTextField table={table} />
						<MRT_ToggleFiltersButton table={table} />
					</Box>
					<Box>
						{(uploadTeamsData || uploadTeamsError) && (
							<ShowMessage
								error={uploadTeamsError}
								message={uploadTeamsData?.message}
								severity="info"
							/>
						)}
						{(updateTeamsData || updateTeamsError) && (
							<ShowMessage
								error={updateTeamsError}
								message={updateTeamsData?.message}
								severity="info"
							/>
						)}
						<Box sx={{ display: "flex", gap: "0.5rem" }}>
							<Button
								variant="contained"
								disabled={isLoadingUploadTeams || competitionId === undefined}
								onClick={handleUpload}
							>
								Upload
							</Button>
							<Button
								variant="contained"
								disabled={isLoadingUpdateTeams || competitionId === undefined}
								onClick={handleUpdate}
							>
								Update
							</Button>
						</Box>
					</Box>
				</Box>
			);
		},
	});
	return <MaterialReactTable table={table} />;
};

export { TeamEditingTable };
