import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { AuthController } from '../../../entities/Auth';
import { useMediaQuery } from '@mui/material';
import { useAppDispatch } from '../../../app/providers/store';
import { initTheme } from '../../../entities/Theme/model/slice/themeSlice';

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

export { Layout };