import { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_EditActionButtons,
    MRT_TableOptions,
} from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

import {
    useUpdateUserMutation,
    useGetAllUsersQuery,
    type User,
} from 'entities/User';
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const AdminPage = () => {
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
    const table = useMaterialReactTable({
        columns,
        data: users,
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        localization: MRT_Localization_RU,
        state: {
            isLoading, //cell skeletons and loading overlay
        },
        getRowId: (row) => row.id,
        onEditingRowSave: handleSaveUser,
        renderEditRowDialogContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <>
                <DialogTitle variant="h3">Edit User</DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                    }}
                >
                    {internalEditComponents}{' '}
                    {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons
                        variant="text"
                        table={table}
                        row={row}
                    />
                </DialogActions>
            </>
        ),
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
    console.log(table.getState());

    return (
        <>
            <div>AdminPage</div>
            <MaterialReactTable table={table} />
            {/* <div>
                {data?.map((user) => (
                    <div key={user.email}>
                        <label>
                            {user.email}
                            <input
                                type="checkbox"
                                name="allow"
                                defaultChecked={user.isAllowed}
                                value={user.id}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                ))}
            </div> */}
        </>
    );
};

export default AdminPage;
