import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Checkbox, IconButton, Tooltip } from "@mui/material";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	type MRT_Row,
	type MRT_TableOptions,
	useMaterialReactTable,
} from "material-react-table";
import { type FC, useMemo, useState } from "react";
import {
	useAddCompetitionMutation,
	useChangeCompetitionStatusMutation,
	useDeleteCompetitionByIdMutation,
	useGetAllCompetitionsQuery,
	useUpdateCompetitionByIdMutation,
} from "@/entities/Competition";
import type { Competition } from "@/shared/api";
import { trueFalse } from "@/shared/const/select";
import { getDefaultMRTOptions } from "@/shared/DefaultTable";
import { ShowMessage } from "@/shared/ui/ShowMessage";

const validateRequired = (value: string) => !!value.length;

function validateCompetition(competition: Competition) {
	return {
		value: !validateRequired(competition.value) ? "Name is Required" : "",
	};
}

const normalizeApiId = (value: unknown): number | undefined => {
	if (value === null || value === undefined || value === "") {
		return undefined;
	}
	const parsed = Number(value);
	return Number.isNaN(parsed) ? undefined : parsed;
};

const CompetitionEditingTable: FC = () => {
	const { data: respondedCompetitions, isLoading } =
		useGetAllCompetitionsQuery();
	const [updateCompetition, { error: updateError }] =
		useUpdateCompetitionByIdMutation();
	const [deleteCompetition, { error: deleteError }] =
		useDeleteCompetitionByIdMutation();
	const [addCompetition, { error: addError }] = useAddCompetitionMutation();
	const [changeStatus, { error: statusError }] =
		useChangeCompetitionStatusMutation();
	const lastError = statusError ?? deleteError ?? updateError ?? addError;
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string | undefined>
	>({});
	const handleSaveCompetition: MRT_TableOptions<Competition>["onEditingRowSave"] =
		async ({ values, table }) => {
			const newValidationErrors = validateCompetition(values);
			if (Object.values(newValidationErrors).some((error) => error)) {
				setValidationErrors(newValidationErrors);
				return;
			}
			setValidationErrors({});
			const { email, ...updatedData } = values;
			await updateCompetition({
				...updatedData,
				apiId: normalizeApiId(values.apiId),
			});
			table.setEditingRow(null); //exit editing mode
		};
	const handleCreateCompetition: MRT_TableOptions<Competition>["onCreatingRowSave"] =
		async ({ values, table }) => {
			const newValidationErrors = validateCompetition(values);
			if (Object.values(newValidationErrors).some((error) => error)) {
				setValidationErrors(newValidationErrors);
				return;
			}
			setValidationErrors({});
			// Новый турнир всегда DRAFT: current назначается после активации.
			const { id, isCurrent: _isCurrent, ...updatedData } = values;
			await addCompetition({
				...updatedData,
				apiId: normalizeApiId(values.apiId),
			});
			table.setCreatingRow(null); //exit creating mode
		};
	// Удалить можно только пустой черновик; турнир с данными архивируется (сервер вернёт 409).
	const openDeleteConfirmModal = (row: MRT_Row<Competition>) => {
		if (window.confirm("Удалить черновик турнира?")) {
			deleteCompetition(row.original.id);
		}
	};
	const handleFinish = async (row: MRT_Row<Competition>) => {
		const result = await changeStatus({
			id: row.original.id,
			action: "finish",
		});
		if (
			"error" in result &&
			result.error &&
			"status" in result.error &&
			result.error.status === 409 &&
			window.confirm("В турнире есть несыгранные матчи. Завершить досрочно?")
		) {
			changeStatus({ id: row.original.id, action: "finish", force: true });
		}
	};
	const competitions: Competition[] = respondedCompetitions || [];
	const columns = useMemo<MRT_ColumnDef<Competition>[]>(
		() => [
			{
				accessorKey: "id",
				header: "id",
				enableEditing: false,
			},
			{
				accessorKey: "status",
				header: "status",
				enableEditing: false,
			},
			{
				accessorKey: "code",
				header: "code",
			},
			{
				accessorKey: "apiId",
				header: "apiId",
				muiEditTextFieldProps: {
					type: "number",
				},
			},
			{
				accessorKey: "value",
				header: "value",
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.value,
					helperText: validationErrors?.value,
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							value: undefined,
						}),
				},
			},
			{
				accessorKey: "isCurrent",
				header: "isCurrent",
				type: "boolean",
				editSelectOptions: trueFalse,
				editVariant: "select",
				Cell: ({ row }) => (
					<Checkbox
						key={`isCurrent${row.id}`}
						disabled
						checked={row.original.isCurrent}
					/>
				),
			},
		],
		[validationErrors],
	);
	const defaultMRTOptions = getDefaultMRTOptions<Competition>();
	const table = useMaterialReactTable({
		...defaultMRTOptions,
		columns,
		data: competitions,
		state: {
			isLoading,
		},
		getRowId: (row) => row.id?.toString(),
		onEditingRowSave: handleSaveCompetition,
		onEditingRowCancel: () => setValidationErrors({}),
		onCreatingRowCancel: () => setValidationErrors({}),
		onCreatingRowSave: handleCreateCompetition,
		renderTopToolbarCustomActions: ({ table }) => (
			<Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
				{lastError && <ShowMessage error={lastError} severity="error" />}
				<Button
					variant="contained"
					onClick={() => {
						table.setCreatingRow(true); //simplest way to open the create row modal with no default values
						//or you can pass in a row object to set default values with the `createRow` helper function
						// table.setCreatingRow(
						//   createRow(table, {
						//     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
						//   }),
						// );
					}}
				>
					Create New Competition
				</Button>
			</Box>
		),
		initialState: {
			columnVisibility: {
				id: false,
			},
		},
		renderRowActions: ({ row, table }) => (
			<Box sx={{ display: "flex", gap: "1rem" }}>
				<Tooltip title="Редактировать">
					<IconButton onClick={() => table.setEditingRow(row)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
				{row.original.status === "DRAFT" && (
					<Tooltip title="Активировать">
						<IconButton
							color="success"
							onClick={() =>
								changeStatus({ id: row.original.id, action: "activate" })
							}
						>
							<PlayArrowIcon />
						</IconButton>
					</Tooltip>
				)}
				{row.original.status === "ACTIVE" && (
					<Tooltip title="Завершить">
						<IconButton onClick={() => handleFinish(row)}>
							<FlagIcon />
						</IconButton>
					</Tooltip>
				)}
				{row.original.status !== "ARCHIVED" && (
					<Tooltip title="В архив">
						<IconButton
							onClick={() => {
								if (
									window.confirm(
										"Перевести турнир в архив? Изменить его будет нельзя.",
									)
								) {
									changeStatus({ id: row.original.id, action: "archive" });
								}
							}}
						>
							<ArchiveIcon />
						</IconButton>
					</Tooltip>
				)}
				{row.original.status === "DRAFT" && (
					<Tooltip title="Удалить">
						<IconButton
							color="error"
							onClick={() => openDeleteConfirmModal(row)}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				)}
			</Box>
		),
	});
	return <MaterialReactTable table={table} />;
};

export { CompetitionEditingTable };
