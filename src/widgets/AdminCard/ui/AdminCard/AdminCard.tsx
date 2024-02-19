import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { AppRoutes } from 'shared/const/routes';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';

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
                <Link to={`..${AppRoutes.USERS}`}>
                    <GroupIcon />
                </Link>
                <Link to={`..${AppRoutes.SETTINGS}`}>
                    <SettingsIcon />
                </Link>
            </CardActions>
        </Card>
    );
};
export { AdminCard };
