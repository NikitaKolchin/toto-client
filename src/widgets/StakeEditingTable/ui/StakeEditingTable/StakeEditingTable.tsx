import { FC } from 'react';
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

const StakeEditingTable: FC = () => {
    const { data: respondedStakes, isLoading } = useGetAllMatchStakesQuery();
    const [updateStake] = useUpdateMatchStakeByIdMutation();
    const handleSaveStake: MRT_TableOptions<MatchStake>['onEditingRowSave'] =
        async ({ values, table }) => {
            console.log(values);

            await updateStake({
                id: values.id,
                homeScore: Number(values['stake.homeScore']),
                awayScore: Number(values['stake.awayScore']),
            });
            table.setEditingRow(null); //exit editing mode
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
                header: 'home',
                muiTableBodyCellProps: {
                    align: 'left',
                },
            },
            {
                accessorKey: 'stake.homeScore',
                header: 'Ставка home',
                muiEditTextFieldProps: {
                    type: 'number',
                },
            },
            {
                accessorKey: 'stake.awayScore',
                header: 'Ставка away',
                muiEditTextFieldProps: {
                    type: 'number',
                },
            },
            {
                accessorKey: 'away.value',
                header: 'away',
                enableEditing: false,
            },
        ],
        [],
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
                <>
                    {row.original.homeScore} : {row.original.awayScore}
                </>
            ) : null,
        // onEditingRowCancel: () => setValidationErrors({}),
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
        },
    });
    return <MaterialReactTable table={table} />;
};

export { StakeEditingTable };
