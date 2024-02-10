import { FC } from 'react';
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
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getDefaultMRTOptions } from 'shared/DefaultTable';

const UserEditingTable: FC = () => {
    const { data, isLoading } = useGetAllUsersQuery();
    const [updateUser, result] = useUpdateUserMutation();

    const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
        values,
        table,
    }) => {
        const { email, ...updatedData } = values;
        await updateUser({ ...updatedData });
        table.setEditingRow(null); //exit editing mode
    };
    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'id', //simple recommended way to define a column
                header: 'ID',
            },
            {
                accessorKey: 'email', //simple recommended way to define a column
                header: 'Email',
            },
            {
                accessorKey: 'firstName', //simple recommended way to define a column
                header: 'firstName',
            },
            {
                accessorKey: 'isAllowed', //id required if you use accessorFn instead of accessorKey
                header: 'Allow',
                type: 'boolean',
                editSelectOptions: [
                    { label: 'Да', value: true },
                    { label: 'Нет', value: false },
                ],
                editVariant: 'select',
                // Edit: ({ row }) => (
                //     <input
                //         type="checkbox"
                //         defaultChecked={row.original.isAllowed}
                //         onChange={(event) => setIsAllowed(event.target.checked)}
                //     />
                // ),
                Cell: ({ row }) => (
                    <input
                        type="checkbox"
                        disabled
                        checked={row.original.isAllowed}
                    />
                ),
            },
        ],
        [],
    );
    const users: User[] = data || [];
    const defaultMRTOptions = getDefaultMRTOptions<User>();
    const table = useMaterialReactTable({
        ...defaultMRTOptions,
        columns,
        data: users,
        state: {
            isLoading, //cell skeletons and loading overlay
        },
        getRowId: (row) => row.id,
        onEditingRowSave: handleSaveUser,
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    });
    return <MaterialReactTable table={table} />;
};

export { UserEditingTable };
