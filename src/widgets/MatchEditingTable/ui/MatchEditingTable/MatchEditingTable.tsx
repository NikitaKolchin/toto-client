import { FC } from 'react';
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_TableOptions,
} from 'material-react-table';

import {
    useUpdateMatchByIdMutation,
    useGetAllMatchesQuery,
} from 'entities/Match';
import { getDefaultMRTOptions } from 'shared/DefaultTable';
import { Match } from 'shared/api';
import { useAppSelector } from 'shared/store/config';
import { Checkbox } from '@mui/material';
import { useGetNationsByCurrentCompetitionQuery } from 'entities/Nation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { trueFalse } from 'shared/const/select';

const MatchEditingTable: FC = () => {
    const { data: respondedMatches, isLoading } = useGetAllMatchesQuery();
    const { data: respondedNations } = useGetNationsByCurrentCompetitionQuery();
    const [updateMatch] = useUpdateMatchByIdMutation();
    const { roles } = useAppSelector((state) => state.user);
    const isAdmin = roles.find((role) => role.value === 'ADMIN') !== undefined;
    const handleSaveMatch: MRT_TableOptions<Match>['onEditingRowSave'] =
        async ({ values, table }) => {
            const {
                id,
                awayScore,
                coefficient,
                date,
                enable,
                homeScore,
                matchNo,
                visibility,
            } = values;
            await updateMatch({
                id,
                awayScore: Number(awayScore),
                homeScore: Number(homeScore),
                coefficient: Number(coefficient),
                date,
                matchNo: Number(matchNo),
                enable: Boolean(enable),
                visibility: Boolean(visibility),
                homeId: Number(
                    respondedNations?.find(
                        (nation) => nation.value === values['home.value'],
                    )?.id,
                ),
                awayId: Number(
                    respondedNations?.find(
                        (nation) => nation.value === values['away.value'],
                    )?.id,
                ),
            });
            table.setEditingRow(null); //exit editing mode
        };
    const matches: Match[] = respondedMatches || [];
    console.log(matches);
    const nations = respondedNations?.map((nation) => nation.value);
    const columns = useMemo<MRT_ColumnDef<Match>[]>(
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
                header: 'хозяева',
                editVariant: 'select',
                editSelectOptions: nations,
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
                header: 'гости',
                editVariant: 'select',
                editSelectOptions: nations,
            },
            {
                accessorKey: 'awayScore',
                header: 'г',
                muiEditTextFieldProps: {
                    type: 'number',
                },
            },
            {
                accessorKey: 'coefficient',
                header: 'coefficient',
            },
            {
                accessorKey: 'enable',
                header: 'enable',
                editVariant: 'select',
                editSelectOptions: trueFalse,
                Cell: ({ row }) => (
                    <Checkbox
                        key={`enable${row.id}`}
                        disabled
                        checked={row.original.enable}
                    />
                ),
            },
            {
                accessorKey: 'visibility',
                header: 'visibility',
                editVariant: 'select',
                editSelectOptions: trueFalse,
                Cell: ({ row }) => (
                    <Checkbox
                        key={`visibility${row.id}`}
                        disabled
                        checked={row.original.visibility}
                    />
                ),
            },
            {
                accessorFn: (row) => new Date(row.date),
                id: 'date',
                Cell: ({ cell }) =>
                    dayjs(cell.getValue<Date>())?.format('DD.MM.YYYY'),
                header: 'date',
                Edit({ column, row }) {
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                onChange={(newValue) => {
                                    row._valuesCache[column.id] =
                                        dayjs(newValue);
                                }}
                                label={column.columnDef.header}
                                value={dayjs(row.getValue<Date>(column.id))}
                                format="DD.MM.YYYY"
                                slotProps={{
                                    textField: {
                                        variant: 'standard',
                                        required: true,
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    );
                },
            },
            {
                accessorKey: 'price',
                header: 'Стоимость',
                enableEditing: false,
            },
            {
                accessorKey: 'jackpot',
                header: 'Джэкпот',
                enableEditing: false,
            },
        ],
        [nations],
    );
    const defaultMRTOptions = getDefaultMRTOptions<Match>();
    const table = useMaterialReactTable({
        ...defaultMRTOptions,
        enableEditing: isAdmin,
        columns,
        data: matches,
        state: {
            isLoading,
        },
        autoResetPageIndex: false,
        getRowId: (row) => row.id?.toString(),
        onEditingRowSave: handleSaveMatch,
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

export { MatchEditingTable };
