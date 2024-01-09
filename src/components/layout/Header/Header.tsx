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
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import AuthController from '../../../controllers/AuthController';
import { Button } from '@mui/material';

type TotoMenuItem = {
    name: string;
    value: string;
};
const menuItems: TotoMenuItem[] = [
    { name: 'Toto Online', value: '/' },
    { name: 'Ставки', value: '/stakes' },
    { name: 'Результаты', value: '/results' },
    { name: 'Информация', value: '/info' },
];

function Header() {
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchThen600 = useMediaQuery(theme.breakpoints.up('sm'));
    const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
        null,
    );
    const [mainAnchorEl, setMainAnchorEl] = useState<null | HTMLElement>(null);

    const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleMainMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMainAnchorEl(event.currentTarget);
    };

    const handleCloseAccountMenu = () => {
        setAccountAnchorEl(null);
    };

    const handleCloseMainMenu = () => {
        setMainAnchorEl(null);
    };

    const handleLogout = () => {
        setAccountAnchorEl(null);
        dispatch(AuthController.logout());
    };

    const handleLogin = () => {
        setAccountAnchorEl(null);
        navigate('login');
    };

    const HeaderLink: FC<
        PropsWithChildren<TotoMenuItem & { isAuth: boolean }>
    > = (props) => {
        if (props.isAuth) {
            return (
                <Link
                    to={props.value}
                    style={{
                        textDecoration: 'none',
                        textTransform: 'lowercase',
                    }}
                >
                    {props.children}
                </Link>
            );
        }
        return (
            <Typography
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
                                id="menu-appbar"
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
                                        component={Link}
                                        to={item.value}
                                        style={{
                                            textDecoration: 'none',
                                            textTransform: 'lowercase',
                                        }}
                                        onClick={handleCloseAccountMenu}
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
                                    <Typography
                                        variant="h6"
                                        color={theme.palette.text.secondary}
                                        sx={{
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
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
                                    id="menu-appbar"
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
                                    <MenuItem
                                        component={Link}
                                        to="profile"
                                        onClick={handleCloseAccountMenu}
                                    >
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
