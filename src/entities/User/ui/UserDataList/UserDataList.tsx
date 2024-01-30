import { Stack, Paper } from '@mui/material';
import { FC } from 'react';
import { User } from '../../model/types/User';
import { UserRoleList } from '../UserRoleList/UserRoleList';

const UserDataList: FC<User> = (user) => {
    return (
        <Stack spacing={2}>
            <Paper>email : {user.email}</Paper>
            <Paper>игровое имя: {user.alias}</Paper>
            <Paper>
                настоящее имя: {`${user.firstName} ${user.secondName}`}{' '}
            </Paper>
            <UserRoleList roles={user.roles} />
        </Stack>
    );
};
export { UserDataList };
