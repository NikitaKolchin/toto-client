import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { AdminActions } from 'features/AdminActions';
import { FC } from 'react';

const AdminCard: FC = () => {
    return (
        <Card>
            <CardHeader title="Панель администратора" />
            <CardContent>
                Количество активных пользователей, кто сделал ставки, кто нет,
                всего матчей, матчи с заполненными данными, матчи с заполненным
                счётом
            </CardContent>
            <CardActions>
                <AdminActions />
            </CardActions>
        </Card>
    );
};
export { AdminCard };
