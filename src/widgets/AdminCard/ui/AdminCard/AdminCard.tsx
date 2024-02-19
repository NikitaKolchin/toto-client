import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { AppRoutes } from 'shared/const/routes';
import UsersIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import CompetitionsIcon from '@mui/icons-material/EmojiEvents';
import classNames from './AdminCard.module.css';

const AdminCard: FC = () => {
    return (
        <Card>
            <CardHeader title="Панель администратора" />
            <CardContent>
                Количество активных пользователей, кто сделал ставки, кто нет,
                всего матчей, матчи с заполненными данными, матчи с заполненным
                счётом
            </CardContent>
            <CardActions className={classNames.actions}>
                <Button
                    component={Link}
                    to={`..${AppRoutes.USERS}`}
                    startIcon={<UsersIcon />}
                >
                    пользователи
                </Button>
                <Button
                    component={Link}
                    to={`..${AppRoutes.SETTINGS}`}
                    startIcon={<SettingsIcon />}
                >
                    настройки
                </Button>
                <Button
                    component={Link}
                    to={`..${AppRoutes.COMPETITIONS}`}
                    startIcon={<CompetitionsIcon />}
                >
                    соревнования
                </Button>
            </CardActions>
        </Card>
    );
};
export { AdminCard };
