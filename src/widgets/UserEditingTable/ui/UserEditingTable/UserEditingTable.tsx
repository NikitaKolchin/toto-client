import { FC, useState } from 'react';
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_TableOptions,
} from 'material-react-table';

import {
    useUpdateUserMutation,
    useGetAllUsersQuery,
    type User,
} from 'entities/User';
import { getDefaultMRTOptions } from 'shared/DefaultTable';
import { trueFalse } from 'shared/const/select';
import { EditUserRoles } from 'features/EditUserRoles';

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
    const [updateUser] = useUpdateUserMutation();
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});
    const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
        values,
        table,
    }) => {
        console.log(values.roles);
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
                accessorKey: 'isAllowed',
                header: 'Allow',
                type: 'boolean',
                editSelectOptions: trueFalse,
                editVariant: 'select',
                Cell: ({ row }) => (
                    <input
                        key={row.id}
                        type="checkbox"
                        disabled
                        checked={row.original.isAllowed}
                    />
                ),
            },
            {
                accessorKey: 'isActivated',
                header: 'isActivated',
                type: 'boolean',
                editSelectOptions: trueFalse,
                editVariant: 'select',
                Cell: ({ row }) => (
                    <input
                        key={`isActivated${row.id}`}
                        type="checkbox"
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
                        <span key={role.id}>{`${role.value}\n`}</span>
                    )),
                Edit: EditUserRoles,
            },
        ],
        [validationErrors],
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
    });
    return <MaterialReactTable table={table} />;
};

export { UserEditingTable };
