import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Stack,
    Paper,
} from '@mui/material';
import { FC } from 'react';
import { ToggleTheme } from '../../app/providers/theme';
import { User } from '../../entities/Auth/model/types/User';

const UserData: FC<User> = (user) => {
    return (
        <Card>
            <CardHeader title="Данные пользователя" />
            <CardContent>
                <Stack spacing={2}>
                    <Paper>email : {user.email}</Paper>
                    <Paper>игровое имя: {user.alias}</Paper>
                    <Paper>
                        настоящее имя: {`${user.firstName} ${user.secondName}`}{' '}
                    </Paper>
                </Stack>
            </CardContent>
            <CardActions>
                <ToggleTheme />
            </CardActions>
        </Card>
    );
};
export { UserData };
