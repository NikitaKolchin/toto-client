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
import { Checkbox } from '@mui/material';
import { useGetNationsByCurrentCompetitionQuery } from 'entities/Nation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { trueFalse } from 'shared/const/select';

const StakeEditingTable: FC = () => {
    const { data: respondedStakes, isLoading } = useGetAllStakesQuery();
    const { data: respondedNations } = useGetNationsByCurrentCompetitionQuery();
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
    const nations = respondedNations?.map((nation) => nation.value);
    const columns = useMemo<MRT_ColumnDef<Stake>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'id',
                enableEditing: false,
            },
            {
                accessorKey: 'stakeNo',
                header: 'STAKE',
            },
            {
                accessorKey: 'homeScore',
                header: 'x',
                muiEditTextFieldProps: {
                    type: 'number',
                },
            },
            {
                accessorKey: 'awayScore',
                header: 'г',
                muiEditTextFieldProps: {
                    type: 'number',
                },
            },
            {
                accessorKey: 'price',
                header: 'Стоимость',
                enableEditing: false,
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
                price: false,
                jackpot: false,
            },
        },
    });
    return <MaterialReactTable table={table} />;
};

export { StakeEditingTable };
