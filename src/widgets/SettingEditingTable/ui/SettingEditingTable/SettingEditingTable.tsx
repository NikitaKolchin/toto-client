import { FC, useState } from 'react';
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_TableOptions,
} from 'material-react-table';

import {
    useGetAllSettingsQuery,
    useUpdateSettingByIdMutation,
} from 'entities/Setting';
import { getDefaultMRTOptions } from 'shared/DefaultTable';
import { trueFalse } from 'shared/const/select';
import { Button, Checkbox } from '@mui/material';
import { Setting } from 'shared/api';
import { useUpdateStakesResultMutation } from 'entities/MatchStake';

const validateRequired = (value: string) => !!value.length;

function validateSetting(setting: Setting) {
    return {
        value: !validateRequired(setting.contribution.toString())
            ? 'contribution is Required'
            : '',
    };
}

const SettingEditingTable: FC = () => {
    const { data: respondedSettings, isLoading } = useGetAllSettingsQuery();
    const [updateSetting] = useUpdateSettingByIdMutation();
    const [updateResults] = useUpdateStakesResultMutation();
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});
    const handleSaveSetting: MRT_TableOptions<Setting>['onEditingRowSave'] =
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
    const columns = useMemo<MRT_ColumnDef<Setting>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'id',
                enableEditing: false,
            },
            {
                accessorKey: 'competition.value',
                header: 'competition',
                enableEditing: false,
            },
            {
                accessorKey: 'contribution',
                header: 'contribution',
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
                accessorKey: 'direction',
                header: 'direction',
            },
            {
                accessorKey: 'difference',
                header: 'difference',
            },
            {
                accessorKey: 'outcome',
                header: 'outcome',
            },
            {
                accessorKey: 'disabled',
                header: 'disabled',
                type: 'boolean',
                editSelectOptions: trueFalse,
                editVariant: 'select',
                Cell: ({ row }) => (
                    <Checkbox
                        key={`disabled${row.id}`}
                        disabled
                        checked={row.original.disabled}
                    />
                ),
            },
        ],
        [validationErrors],
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
        renderTopToolbarCustomActions: () => (
            <Button variant="contained" onClick={() => updateResults()}>
                Update results
            </Button>
        ),
        initialState: {
            columnVisibility: {
                id: false,
            },
        },
    });
    return <MaterialReactTable table={table} />;
};

export { SettingEditingTable };
