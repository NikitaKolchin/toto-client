import { FC, useState } from 'react';
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
const validateRequired = (value: string) => !!value.length;

function validateMatch(match: Match) {
    return {
        homeScore: !validateRequired(match.homeScore)
            ? 'Value is Required'
            : '',
    };
}

const MatchesEditingTable: FC = () => {
    const { data: respondedMatches, isLoading } = useGetAllMatchesQuery();
    const [updateMatch] = useUpdateMatchByIdMutation();
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});
    const { roles } = useAppSelector((state) => state.user);
    const isAdmin = roles.find((role) => role.value === 'ADMIN') !== undefined;
    const handleSaveMatch: MRT_TableOptions<Match>['onEditingRowSave'] =
        async ({ values, table }) => {
            const newValidationErrors = validateMatch(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});
            const { email, ...updatedData } = values;
            await updateMatch({ ...updatedData });
            table.setEditingRow(null); //exit editing mode
        };
    const matches: Match[] = respondedMatches || [];
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
                accessorKey: 'homeScore',
                header: 'x',
            },
            {
                accessorKey: 'away.value',
                header: 'гости',
            },
            {
                accessorKey: 'awayScore',
                header: 'г',
            },
            {
                accessorKey: 'coefficient',
                header: 'coefficient',
            },
            {
                accessorKey: 'enable',
                header: 'enable',
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
                Cell: ({ row }) => (
                    <Checkbox
                        key={`visibility${row.id}`}
                        disabled
                        checked={row.original.visibility}
                    />
                ),
            },
            {
                accessorKey: 'price',
                header: 'price',
            },
            {
                accessorKey: 'jackpot',
                header: 'jackpot',
            },
            {
                accessorFn: (row) => new Date(row.date),
                id: 'date',
                Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
                header: 'date',
            },
        ],
        [validationErrors],
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
        getRowId: (row) => row.id,
        onEditingRowSave: handleSaveMatch,
        onEditingRowCancel: () => setValidationErrors({}),
        initialState: {
            columnVisibility: {
                id: false,
            },
        },
    });
    return <MaterialReactTable table={table} />;
};

export { MatchesEditingTable };
