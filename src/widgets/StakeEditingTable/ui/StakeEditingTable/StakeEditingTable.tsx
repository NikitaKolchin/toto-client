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
import { useAppSelector } from 'shared/store/config';

const StakeEditingTable: FC = () => {
    const { data: respondedStakes, isLoading } = useGetAllMatchStakesQuery();
    const [updateStake] = useUpdateMatchStakeByIdMutation();
    const { roles } = useAppSelector((state) => state.user);
    const isAdmin = roles.find((role) => role.value === 'ADMIN') !== undefined;
    const handleSaveStake: MRT_TableOptions<MatchStake>['onEditingRowSave'] =
        async ({ values, table }) => {
            const { id } = values;
            await updateStake({ id });
            table.setEditingRow(null); //exit editing mode
        };
    const matchStakes: MatchStake[] = respondedStakes || [];
    console.log(matchStakes);
    const columns = useMemo<MRT_ColumnDef<MatchStake>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'id',
                enableEditing: false,
            },
            {
                accessorKey: 'matchNo',
                header: 'matchNo',
            },
            {
                accessorKey: 'home.value',
                header: 'home',
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
            {
                accessorKey: 'awayScore',
                header: 'г',
            },
            {
                accessorKey: 'homeScore',
                header: 'x',
                enableEditing: false,
            },
        ],
        [],
    );
    const defaultMRTOptions = getDefaultMRTOptions<MatchStake>();
    const table = useMaterialReactTable({
        ...defaultMRTOptions,
        enableEditing: isAdmin,
        columns,
        data: matchStakes,
        state: {
            isLoading,
        },
        autoResetPageIndex: false,
        enableExpandAll: false, //hide expand all double arrow in column header
        getRowId: (row) => row.id?.toString(),
        onEditingRowSave: handleSaveStake,
        renderDetailPanel: ({ row }) =>
            row.original.stake ? <> jopa</> : null,
        // onEditingRowCancel: () => setValidationErrors({}),
        initialState: {
            columnVisibility: {
                id: false,
            },
        },
    });
    return <MaterialReactTable table={table} />;
};

export { StakeEditingTable };
