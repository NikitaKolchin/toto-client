import { AppRoutes } from 'shared/const/routes';
import UsersIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import CompetitionsIcon from '@mui/icons-material/EmojiEvents';
import classNames from './AdminActions.module.css';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { FC } from 'react';

const AdminActions: FC = () => {
    return (
        <Box className={classNames.actions}>
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
        </Box>
    );
};

export { AdminActions };
