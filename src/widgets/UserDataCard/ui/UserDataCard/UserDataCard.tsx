import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { FC } from 'react';
import { ToggleTheme } from 'features/ToggleTheme';
import { UserDataList, UserState } from 'entities/User';
import { SetRowsOnPage } from 'features/SetRowsOnPage';

const UserDataCard: FC<UserState> = (user) => {
    return (
        <Card>
            <CardHeader title="Данные пользователя" />
            <CardContent>
                <UserDataList {...user} />
            </CardContent>
            <CardActions>
                <ToggleTheme />
                <SetRowsOnPage />
            </CardActions>
        </Card>
    );
};
export { UserDataCard };
