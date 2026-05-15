import { Checkbox } from "@mui/material";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	type MRT_TableOptions,
	useMaterialReactTable,
} from "material-react-table";
import { type FC, useMemo, useState } from "react";
import { useGetAllCompetitionsQuery } from "@/entities/Competition";
import {
	useGetAllSettingsQuery,
	useUpdateSettingByIdMutation,
} from "@/entities/Setting";
import type { Setting } from "@/shared/api";
import { trueFalse } from "@/shared/const/select";
import { getDefaultMRTOptions } from "@/shared/DefaultTable";

const validateRequired = (value: string) => !!value.length;

function validateSetting(setting: Setting) {
	return {
		value: !validateRequired(setting.contribution.toString())
			? "contribution is Required"
			: "",
	};
}

const SettingEditingTable: FC = () => {
	const { data: respondedSettings, isLoading } = useGetAllSettingsQuery();
	const { data: respondedCompetitions } = useGetAllCompetitionsQuery();
	const [updateSetting] = useUpdateSettingByIdMutation();
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string | undefined>
	>({});
	const handleSaveSetting: MRT_TableOptions<Setting>["onEditingRowSave"] =
		async ({ values, table }) => {
			const newValidationErrors = validateSetting(values);
			if (Object.values(newValidationErrors).some((error) => error)) {
				setValidationErrors(newValidationErrors);
				return;
			}
			setValidationErrors({});

			await updateSetting({
				...values,
				contribution: Number(values.contribution),
				direction: Number(values.direction),
				difference: Number(values.difference),
				outcome: Number(values.outcome),
			});
			table.setEditingRow(null); //exit editing mode
		};
	const settings: Setting[] = respondedSettings || [];
	const competitionsById = new Map(
		(respondedCompetitions || []).map((competition) => [
			competition.id,
			competition.value,
		]),
	);
	const columns = useMemo<MRT_ColumnDef<Setting>[]>(
		() => [
			{
				accessorKey: "id",
				header: "id",
				enableEditing: false,
			},
			{
				accessorFn: (row) =>
					competitionsById.get(
						(row as Setting & { competitionId?: number }).competitionId ??
							row.competition?.id,
					) ??
					row.competition?.value ??
					"",
				id: "competition",
				header: "competition",
				enableEditing: false,
			},
			{
				accessorKey: "contribution",
				header: "contribution",
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
				accessorKey: "direction",
				header: "direction",
			},
			{
				accessorKey: "difference",
				header: "difference",
			},
			{
				accessorKey: "outcome",
				header: "outcome",
			},
			{
				accessorKey: "disabled",
				header: "disabled",
				type: "boolean",
				editSelectOptions: trueFalse,
				editVariant: "select",
				Cell: ({ row }) => (
					<Checkbox
						key={`disabled${row.id}`}
						disabled
						checked={row.original.disabled}
					/>
				),
			},
		],
		[validationErrors, competitionsById],
	);
	const defaultMRTOptions = getDefaultMRTOptions<Setting>();
	const table = useMaterialReactTable({
		...defaultMRTOptions,
		columns,
		data: settings,
		state: {
			isLoading,
		},
		getRowId: (row) => row.id?.toString(),
		onEditingRowSave: handleSaveSetting,
		onEditingRowCancel: () => setValidationErrors({}),
		onCreatingRowCancel: () => setValidationErrors({}),
		initialState: {
			columnVisibility: {
				id: false,
			},
		},
	});
	return <MaterialReactTable table={table} />;
};

export { SettingEditingTable };
