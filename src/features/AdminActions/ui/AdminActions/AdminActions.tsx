import { AppRoutes } from 'shared/const/routes';
import UsersIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import CompetitionsIcon from '@mui/icons-material/EmojiEvents';
import NationsIcon from '@mui/icons-material/Flag';
import classNames from './AdminActions.module.css';
import { Link } from 'react-router-dom';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';

const actions = [
    {
        name: 'пользователи',
        route: `..${AppRoutes.USERS}`,
        icon: <UsersIcon />,
    },
    {
        name: 'настройки',
        route: `..${AppRoutes.SETTINGS}`,
        icon: <SettingsIcon />,
    },
    {
        name: 'турниры',
        route: `..${AppRoutes.COMPETITIONS}`,
        icon: <CompetitionsIcon />,
    },
    {
        name: 'страны',
        route: `..${AppRoutes.NATIONS}`,
        icon: <NationsIcon />,
    },
];

const AdminActions: FC = () => {
    const theme = useTheme();
    const matchThen600 = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <Box className={classNames.actions}>
            {actions.map(({ name, route, icon }) => (
                <Button key={name} component={Link} to={route} startIcon={icon}>
                    {matchThen600 ? name : ''}
                </Button>
            ))}
        </Box>
    );
};

export { AdminActions };
