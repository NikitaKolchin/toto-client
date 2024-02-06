import { ChangeEvent, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_EditActionButtons,
    MRT_TableOptions,
} from 'material-react-table';
import {
    useToggleAllowMutation,
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
    const [toggleAllow, result] = useToggleAllowMutation();
    async function handleChange(
        event: ChangeEvent<HTMLInputElement>,
    ): Promise<void> {
        const userId = event.target.value as unknown as User['id'];
        toggleAllow(userId);
    }

    const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
        values,
        table,
    }) => {
        await toggleAllow(values.id);
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
                accessorKey: 'isAllowed', //id required if you use accessorFn instead of accessorKey
                header: 'Allow',
                Edit: ({ row }) => (
                    <input
                        type="checkbox"
                        defaultChecked={row.original.isAllowed}
                        value={row.original.id}
                    />
                ),
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
    console.log(users);
    const table = useMaterialReactTable({
        columns,
        data: users,
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
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
