import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useAppDispatch } from 'shared/store/config';
import { initTheme } from '../../../entities/Theme/model/slice/themeSlice';
import { useCheckAuthMutation } from 'entities/Auth';

const Layout = () => {
    const dispatch = useAppDispatch();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [checkAuth] = useCheckAuthMutation();
    useEffect(() => {
        dispatch(initTheme(prefersDarkMode));
        checkAuth();
    }, [dispatch, prefersDarkMode, checkAuth]);

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
