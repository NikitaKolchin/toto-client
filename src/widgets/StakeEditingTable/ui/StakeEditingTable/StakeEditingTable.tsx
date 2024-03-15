import { FC } from 'react';
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_TableOptions,
} from 'material-react-table';

import {
    useUpdateStakeByIdMutation,
    useGetAllStakesQuery,
} from 'entities/Stake';
import { getDefaultMRTOptions } from 'shared/DefaultTable';
import { Stake } from 'shared/api';
import { useAppSelector } from 'shared/store/config';
import { Typography } from '@mui/material';

const StakeEditingTable: FC = () => {
    const { data: respondedStakes, isLoading } = useGetAllStakesQuery();
    const [updateStake] = useUpdateStakeByIdMutation();
    const { roles } = useAppSelector((state) => state.user);
    const isAdmin = roles.find((role) => role.value === 'ADMIN') !== undefined;
    const handleSaveStake: MRT_TableOptions<Stake>['onEditingRowSave'] =
        async ({ values, table }) => {
            const { id } = values;
            await updateStake({ id });
            table.setEditingRow(null); //exit editing mode
        };
    const stakes: Stake[] = respondedStakes || [];
    console.log(stakes);
    const columns = useMemo<MRT_ColumnDef<Stake>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'id',
                enableEditing: false,
            },
            {
                accessorKey: 'home.value',
                header: 'home',
            },
            {
                accessorKey: 'homeScore',
                header: 'x',
                muiEditTextFieldProps: {
                    type: 'number',
                },
            },
            {
                accessorKey: 'away.value',
                header: 'away',
            },
            {
                accessorKey: 'awayScore',
                header: 'г',
                muiEditTextFieldProps: {
                    type: 'number',
                },
            },
            {
                accessorKey: 'stakes',
                header: 'Стоимость',
                enableEditing: false,
                Cell: ({ row }) =>
                    row.original.stakes.map((stake) => (
                        <Typography
                            key={stake.id}
                        >{`${stake.homeScore}\n`}</Typography>
                    )),
            },
        ],
        [],
    );
    const defaultMRTOptions = getDefaultMRTOptions<Stake>();
    const table = useMaterialReactTable({
        ...defaultMRTOptions,
        enableEditing: isAdmin,
        columns,
        data: stakes,
        state: {
            isLoading,
        },
        autoResetPageIndex: false,
        getRowId: (row) => row.id?.toString(),
        onEditingRowSave: handleSaveStake,
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
