import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import AuthController from '../../../controllers/AuthController';
import { useMediaQuery } from '@mui/material';
import { initTheme } from '../../../store/themeSlice';

const Layout = () => {
    const dispatch = useAppDispatch();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        dispatch(initTheme(prefersDarkMode));
        dispatch(AuthController.checkAuth());
    }, [dispatch, prefersDarkMode]);

    return (
        <>
            <CssBaseline />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
