/* eslint-disable react/jsx-pascal-case */
import { FC, useState } from 'react';
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_TableOptions,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from 'material-react-table';

import {
    useUpdateNationByIdMutation,
    useGetAllNationsQuery,
    useUploadNationsMutation,
} from 'entities/Nation';
import { getDefaultMRTOptions } from 'shared/DefaultTable';
import { Competition, Nation } from 'shared/api';
import { EditMultipleValueRow } from 'features/EditMultipleValueRow';
import { useGetAllCompetitionsQuery } from 'entities/Competition';
import { Box, Button, Typography } from '@mui/material';
import { ShowMessage } from 'shared/ui/ShowMessage';

const validateRequired = (value: string) => !!value.length;

function validateNation(nation: Nation) {
    return {
        firstName: !validateRequired(nation.value) ? 'Value is Required' : '',
    };
}

const NationEditingTable: FC = () => {
    const { data: respondedNations, isLoading } = useGetAllNationsQuery();
    const [
        uploadNations,
        {
            isLoading: isLoadingUploadNations,
            error: uploadNationsError,
            data: uploadNationsData,
        },
    ] = useUploadNationsMutation();
    const [updateNation] = useUpdateNationByIdMutation();
    const { data: respondedCompetitions, isLoading: isLoadingCompetitions } =
        useGetAllCompetitionsQuery();
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const handleSaveNation: MRT_TableOptions<Nation>['onEditingRowSave'] =
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
                accessorKey: 'id',
                header: 'id',
                enableEditing: false,
            },
            {
                accessorKey: 'value',
                header: 'value',
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
                accessorKey: 'description',
                header: 'description',
                enableEditing: false,
            },
            {
                accessorKey: 'competitions',
                header: 'competitions',
                filterVariant: 'select',
                filterSelectOptions: respondedCompetitions,
                filterFn: 'competitionsFilter',
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
                    (competition: Competition) =>
                        competition.value === filterValue,
                ) !== undefined,
        },
        columnFilterDisplayMode: 'popover',
        initialState: {
            columnVisibility: {
                firstName: false,
                secondName: false,
                id: false,
            },
        },
        renderTopToolbar: ({ table }) => {
            const handleUpload = () => {
                uploadNations();
            };
            return (
                <Box
                    sx={() => ({
                        display: 'flex',
                        gap: '0.5rem',
                        p: '8px',
                        justifyContent: 'space-between',
                    })}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
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
                                absolute={true}
                            />
                        )}
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                variant="contained"
                                disabled={isLoadingUploadNations}
                                onClick={handleUpload}
                            >
                                Upload
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
