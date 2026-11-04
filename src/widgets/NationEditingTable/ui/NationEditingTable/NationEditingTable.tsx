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
	useGetAllNationsQuery,
	useUpdateNationByIdMutation,
	useUpdateNationsMutation,
	useUploadNationsMutation,
} from "@/entities/Nation";
import { EditMultipleValueRow } from "@/features/EditMultipleValueRow";
import type { Competition, Nation } from "@/shared/api";
import { getDefaultMRTOptions } from "@/shared/DefaultTable";
import { ShowMessage } from "@/shared/ui/ShowMessage";

const validateRequired = (value: string) => !!value.length;

function validateNation(nation: Nation) {
	return {
		firstName: !validateRequired(nation.value) ? "Value is Required" : "",
	};
}

const NationEditingTable: FC = () => {
	const competitionId = useCompetitionId();
	const { data: respondedNations, isLoading } = useGetAllNationsQuery();
	const [
		uploadNations,
		{
			isLoading: isLoadingUploadNations,
			error: uploadNationsError,
			data: uploadNationsData,
		},
	] = useUploadNationsMutation();
	const [
		updateNations,
		{
			isLoading: isLoadingUpdateNations,
			error: updateNationsError,
			data: updateNationsData,
		},
	] = useUpdateNationsMutation();
	const [updateNation] = useUpdateNationByIdMutation();
	const { data: respondedCompetitions, isLoading: isLoadingCompetitions } =
		useGetAllCompetitionsQuery();
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string | undefined>
	>({});

	const handleSaveNation: MRT_TableOptions<Nation>["onEditingRowSave"] =
		async ({ values, table }) => {
			const newValidationErrors = validateNation(values);
			if (Object.values(newValidationErrors).some((error) => error)) {
				setValidationErrors(newValidationErrors);
				return;
			}
			setValidationErrors({});
			await updateNation(values);
			table.setEditingRow(null); //exit editing mode
		};
	const nations: Nation[] = respondedNations || [];
	const columns = useMemo<MRT_ColumnDef<Nation>[]>(
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
					//remove any previous validation errors when nation focuses on the input
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
					EditMultipleValueRow<Nation>({
						column,
						row,
						data: respondedCompetitions,
						isLoading: isLoadingCompetitions,
					}),
			},
		],
		[isLoadingCompetitions, respondedCompetitions, validationErrors],
	);
	const defaultMRTOptions = getDefaultMRTOptions<Nation>();
	const table = useMaterialReactTable({
		...defaultMRTOptions,
		columns,
		data: nations,
		state: {
			isLoading,
		},
		autoResetPageIndex: false,
		getRowId: (row) => row.id,
		onEditingRowSave: handleSaveNation,
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
				if (competitionId !== undefined) uploadNations(competitionId);
			};
			const handleUpdate = () => {
				if (competitionId !== undefined) updateNations(competitionId);
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
						{(uploadNationsData || uploadNationsError) && (
							<ShowMessage
								error={uploadNationsError}
								message={uploadNationsData?.message}
								severity="info"
							/>
						)}
						{(updateNationsData || updateNationsError) && (
							<ShowMessage
								error={updateNationsError}
								message={updateNationsData?.message}
								severity="info"
							/>
						)}
						<Box sx={{ display: "flex", gap: "0.5rem" }}>
							<Button
								variant="contained"
								disabled={isLoadingUploadNations || competitionId === undefined}
								onClick={handleUpload}
							>
								Upload
							</Button>
							<Button
								variant="contained"
								disabled={isLoadingUpdateNations || competitionId === undefined}
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

export { NationEditingTable };
