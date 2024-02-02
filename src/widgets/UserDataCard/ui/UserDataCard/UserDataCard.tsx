import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { FC } from 'react';
import { ToggleTheme } from 'features/ToggleTheme';
import { UserDataList, UserState } from 'entities/User';

const UserDataCard: FC<UserState> = (user) => {
    console.log(user);
    return (
        <Card>
            <CardHeader title="Данные пользователя" />
            <CardContent>
                <UserDataList {...user} />
            </CardContent>
            <CardActions>
                <ToggleTheme />
            </CardActions>
        </Card>
    );
};
export { UserDataCard };
