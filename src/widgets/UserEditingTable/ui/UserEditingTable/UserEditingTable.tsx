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
    useUpdateUserMutation,
    useGetAllUsersQuery,
    useGetAllRolesQuery,
    useDeleteUserMutation,
} from 'entities/User';
import { getDefaultMRTOptions } from 'shared/DefaultTable';
import { trueFalse } from 'shared/const/select';
import { User } from 'shared/api';
import { Box, Checkbox, IconButton, Tooltip, Typography } from '@mui/material';
import { EditMultipleValueRow } from 'features/EditMultipleValueRow';
import { useGetAllCompetitionsQuery } from 'entities/Competition';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const validateRequired = (value: string) => !!value.length;

function validateUser(user: User) {
    return {
        firstName: !validateRequired(user.firstName)
            ? 'First Name is Required'
            : '',
    };
}

const UserEditingTable: FC = () => {
    const { data: respondedUsers, isLoading } = useGetAllUsersQuery();
    const { data: respondedRoles, isLoading: isLoadingRoles } =
        useGetAllRolesQuery();

    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const { data: respondedCompetitions, isLoading: isLoadingCompetitions } =
        useGetAllCompetitionsQuery();
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});
    const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
        values,
        table,
    }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        const { email, ...updatedData } = values;
        await updateUser({ ...updatedData });
        table.setEditingRow(null); //exit editing mode
    };
    const openDeleteConfirmModal = (row: MRT_Row<User>) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(row.original.id);
        }
    };
    const users: User[] = respondedUsers || [];
    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'id',
                enableEditing: false,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                enableEditing: false,
            },
            {
                accessorKey: 'firstName',
                header: 'firstName',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.firstName,
                    helperText: validationErrors?.firstName,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            firstName: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'secondName',
                header: 'secondName',
            },
            {
                accessorKey: 'alias',
                header: 'alias',
            },
            {
                accessorKey: 'isActivated',
                header: 'isActivated',
                type: 'boolean',
                editSelectOptions: trueFalse,
                editVariant: 'select',
                Cell: ({ row }) => (
                    <Checkbox
                        key={`isActivated${row.id}`}
                        disabled
                        checked={row.original.isActivated}
                    />
                ),
            },
            {
                accessorKey: 'roles',
                header: 'roles',
                Cell: ({ row }) =>
                    row.original.roles.map((role) => (
                        <Typography
                            key={role.id}
                        >{`${role.value}\n`}</Typography>
                    )),
                Edit: ({ column, row }) =>
                    EditMultipleValueRow<User>({
                        column,
                        row,
                        data: respondedRoles,
                        isLoading: isLoadingRoles,
                    }),
            },
            {
                accessorKey: 'competitions',
                header: 'competitions',
                Cell: ({ row }) =>
                    row.original.competitions.map((competition) => (
                        <Typography
                            key={competition.id}
                        >{`${competition.value}\n`}</Typography>
                    )),
                Edit: ({ column, row }) =>
                    EditMultipleValueRow<User>({
                        column,
                        row,
                        data: respondedCompetitions,
                        isLoading: isLoadingCompetitions,
                    }),
            },
        ],
        [
            isLoadingCompetitions,
            isLoadingRoles,
            respondedCompetitions,
            respondedRoles,
            validationErrors,
        ],
    );
    const defaultMRTOptions = getDefaultMRTOptions<User>();
    const table = useMaterialReactTable({
        ...defaultMRTOptions,
        columns,
        data: users,
        state: {
            isLoading,
        },
        getRowId: (row) => row.id,
        onEditingRowSave: handleSaveUser,
        onEditingRowCancel: () => setValidationErrors({}),
        initialState: {
            columnVisibility: {
                firstName: false,
                secondName: false,
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

export { UserEditingTable };
