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
const validateRequired = (value: string) => !!value.length;

function validateMatch(nation: Match) {
    return {
        firstName: !validateRequired(nation.value) ? 'Value is Required' : '',
    };
}

const MatchesEditingTable: FC = () => {
    const { data: respondedMatches, isLoading } = useGetAllMatchesQuery();
    const [updateMatch] = useUpdateMatchByIdMutation();
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});
    const handleSaveMatch: MRT_TableOptions<Match>['onEditingRowSave'] =
        async ({ values, table }) => {
            console.log(values.roles);
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
                accessorKey: 'home.value',
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
                accessorKey: 'competition.value',
                header: 'competition',
            },
        ],
        [validationErrors],
    );
    const defaultMRTOptions = getDefaultMRTOptions<Match>();
    const table = useMaterialReactTable({
        ...defaultMRTOptions,
        columns,
        data: matches,
        state: {
            isLoading,
        },
        getRowId: (row) => row.id,
        onEditingRowSave: handleSaveMatch,
        onEditingRowCancel: () => setValidationErrors({}),
    });
    return <MaterialReactTable table={table} />;
};

export { MatchesEditingTable };
