import { FC, PropsWithChildren, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { To, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useLogoutMutation } from 'entities/User';
import { Button } from '@mui/material';
import { useAppSelector } from 'shared/store/config';
import { AppRoutes } from 'shared/const/routes';

type TotoMenuItem = {
    name: string;
    value: string;
};
const menuItems: TotoMenuItem[] = [
    { name: 'Toto Online', value: AppRoutes.MAIN },
    { name: 'Ставки', value: AppRoutes.STAKES },
    { name: 'Результаты', value: AppRoutes.RESULT },
    { name: 'Информация', value: AppRoutes.INFO },
];

function Header() {
    const [logout] = useLogoutMutation();
    const { isAuth } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const theme = useTheme();
    const matchThen600 = useMediaQuery(theme.breakpoints.up('sm'));
    const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
        null,
    );
    const [mainAnchorEl, setMainAnchorEl] = useState<null | HTMLElement>(null);

    const handleMainMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMainAnchorEl(event.currentTarget);
    };

    const handleCloseMainMenu = (value: To) => {
        setMainAnchorEl(null);
        setTimeout(() => {
            navigate(value);
        }, 300);
    };

    const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleCloseAccountMenu = () => {
        setAccountAnchorEl(null);
    };

    const handleProfile = () => {
        setAccountAnchorEl(null);
        setTimeout(() => {
            navigate(AppRoutes.PROFILE);
        }, 300);
    };

    const handleLogout = () => {
        setAccountAnchorEl(null);
        logout();
    };

    const handleLogin = () => {
        setAccountAnchorEl(null);
        navigate(AppRoutes.LOGIN);
    };
    const secondaryMainColor = theme.palette.secondary.main;
    const HeaderLink: FC<
        PropsWithChildren<TotoMenuItem & { isAuth: boolean }>
    > = (props) => {
        if (props.isAuth) {
            return (
                <Typography
                    //TD add debounce
                    onClick={() => setTimeout(() => navigate(props.value), 300)}
                    variant="h6"
                    color={secondaryMainColor}
                    sx={{
                        textDecoration: 'none',
                        cursor: 'pointer',
                        textTransform: 'lowercase',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {props.children}
                </Typography>
            );
        }
        return (
            <Typography
                variant="h6"
                color={secondaryMainColor}
                sx={{
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                }}
                style={{ textTransform: 'lowercase', cursor: 'not-allowed' }}
            >
                {props.children}
            </Typography>
        );
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {!matchThen600 && (
                        <>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleMainMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={mainAnchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(mainAnchorEl)}
                                onClose={handleCloseMainMenu}
                            >
                                {menuItems.map((item, index) => (
                                    <MenuItem
                                        key={item.value}
                                        style={{
                                            textDecoration: 'none',
                                            textTransform: 'lowercase',
                                        }}
                                        onClick={() =>
                                            handleCloseMainMenu(item.value)
                                        }
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    )}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        {matchThen600 &&
                            menuItems.map((item) => (
                                <HeaderLink
                                    key={item.value}
                                    isAuth={isAuth}
                                    {...item}
                                >
                                    {item.name}
                                </HeaderLink>
                            ))}
                    </Box>

                    <Box>
                        {isAuth ? (
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleAccountMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    anchorEl={accountAnchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(accountAnchorEl)}
                                    onClose={handleCloseAccountMenu}
                                >
                                    <MenuItem onClick={handleProfile}>
                                        профиль игрока
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        выйти{' '}
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button color="secondary" onClick={handleLogin}>
                                войти
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
