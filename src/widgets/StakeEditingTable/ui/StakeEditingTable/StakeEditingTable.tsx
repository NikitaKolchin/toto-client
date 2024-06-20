import { FC, useState } from 'react';
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_TableOptions,
} from 'material-react-table';

import {
    useGetAllMatchStakesQuery,
    useUpdateMatchStakeByIdMutation,
} from 'entities/MatchStake';
import { getDefaultMRTOptions } from 'shared/DefaultTable';
import type { MatchStake } from 'entities/MatchStake';
import { Box } from '@mui/material';
import { useAppSelector } from 'shared/store/config';

const getErrorMessage = (data: { message: string } | string): string => {
    if (typeof data === 'string') return data;
    else if ('message' in data) return data.message;
    return 'error';
};

const StakeEditingTable: FC = () => {
    const theme = useAppSelector((state) => state.theme);
    const { data: respondedStakes, isLoading } = useGetAllMatchStakesQuery();
    const [updateStake] = useUpdateMatchStakeByIdMutation();
    const [validationErrors, setValidationErrors] = useState('');
    const handleSaveStake: MRT_TableOptions<MatchStake>['onEditingRowSave'] =
        async ({ values, table }) => {
            const result = await updateStake({
                id: values.id,
                homeScore: Number(values['stake.homeScore']),
                awayScore: Number(values['stake.awayScore']),
            });
            if ('data' in result) {
                table.setEditingRow(null);
            } else if ('error' in result) {
                if ('data' in result.error) {
                    setValidationErrors(
                        getErrorMessage(
                            result.error.data as { message: string } | string,
                        ),
                    );
                }
            }
        };
    const matchStakes: MatchStake[] = respondedStakes || [];
    const columns = useMemo<MRT_ColumnDef<MatchStake>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'id',
                enableEditing: false,
                visibleInShowHideMenu: false,
                Edit: () => null,
            },
            {
                accessorKey: 'matchNo',
                enableEditing: false,
                header: '#',
                minSize: 20,
                maxSize: 40,
                size: 30,
            },
            {
                accessorKey: 'home.value',
                enableEditing: false,
                header: 'хозяева',
                muiTableBodyCellProps: {
                    align: 'left',
                },
            },
            {
                accessorKey: 'stake.homeScore',
                header: '',
                muiEditTextFieldProps: {
                    type: 'number',
                    error: !!validationErrors,
                    helperText: validationErrors,
                },
            },
            {
                accessorKey: 'stake.awayScore',
                header: '',
                muiEditTextFieldProps: {
                    type: 'number',
                    error: !!validationErrors,
                    helperText: validationErrors,
                },
            },
            {
                accessorKey: 'away.value',
                header: 'гости',
                enableEditing: false,
            },
        ],
        [validationErrors],
    );
    const defaultMRTOptions = getDefaultMRTOptions<MatchStake>();
    const table = useMaterialReactTable({
        ...defaultMRTOptions,
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
            row.original.homeScore !== null &&
            row.original.awayScore !== null ? (
                <Box ml={12}>
                    Матч сыгран, счёт {row.original.homeScore} :{' '}
                    {row.original.awayScore}
                </Box>
            ) : null,
        onEditingRowCancel: () => setValidationErrors(''),
        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: '',
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
