import { FC, useState } from 'react';
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_TableOptions,
    MRT_Row,
} from 'material-react-table';

import {
    useGetAllCompetitionsQuery,
    useUpdateCompetitionByIdMutation,
    useDeleteCompetitionByIdMutation,
    useAddCompetitionMutation,
} from 'entities/Competition';
import { getDefaultMRTOptions } from 'shared/DefaultTable';
import { trueFalse } from 'shared/const/select';
import type { Competition } from 'shared/api';
import { Box, Button, Checkbox, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const validateRequired = (value: string) => !!value.length;

function validateCompetition(competition: Competition) {
    return {
        value: !validateRequired(competition.value) ? 'Name is Required' : '',
    };
}

const CompetitionEditingTable: FC = () => {
    const { data: respondedCompetitions, isLoading } =
        useGetAllCompetitionsQuery();
    const [updateCompetition] = useUpdateCompetitionByIdMutation();
    const [deleteCompetition] = useDeleteCompetitionByIdMutation();
    const [addCompetition] = useAddCompetitionMutation();
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});
    const handleSaveCompetition: MRT_TableOptions<Competition>['onEditingRowSave'] =
        async ({ values, table }) => {
            const newValidationErrors = validateCompetition(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});
            const { email, ...updatedData } = values;
            await updateCompetition({ ...updatedData });
            table.setEditingRow(null); //exit editing mode
        };
    const handleCreateCompetition: MRT_TableOptions<Competition>['onCreatingRowSave'] =
        async ({ values, table }) => {
            const newValidationErrors = validateCompetition(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});
            const { id, ...updatedData } = values;
            await addCompetition(updatedData);
            table.setCreatingRow(null); //exit creating mode
        };
    const openDeleteConfirmModal = (row: MRT_Row<Competition>) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteCompetition(row.original.id);
        }
    };
    const competitions: Competition[] = respondedCompetitions || [];
    const columns = useMemo<MRT_ColumnDef<Competition>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'id',
                enableEditing: false,
            },
            {
                accessorKey: 'value',
                header: 'value',
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
                accessorKey: 'isCurrent',
                header: 'isCurrent',
                type: 'boolean',
                editSelectOptions: trueFalse,
                editVariant: 'select',
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
        ),
        initialState: {
            columnVisibility: {
                id: false,
            },
        },
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Редактировать">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Удалить">
                    <IconButton
                        color="error"
                        onClick={() => openDeleteConfirmModal(row)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    });
    return <MaterialReactTable table={table} />;
};

export { CompetitionEditingTable };
