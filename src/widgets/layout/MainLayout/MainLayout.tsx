import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'shared/store/config';
import { initTheme } from 'entities/Theme';
import { useCheckAuthMutation } from 'entities/User';
import { useGetAllCompetitionsQuery } from 'entities/Competition';

const Layout = () => {
    const dispatch = useAppDispatch();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [checkAuth] = useCheckAuthMutation();
    const { value } = useAppSelector((state) => state.competition);
    const { isLoading: isCompetitionsLoading } = useGetAllCompetitionsQuery();
    useEffect(() => {
        dispatch(initTheme(prefersDarkMode));
        checkAuth();
    }, [dispatch, prefersDarkMode, checkAuth]);
    useEffect(() => {
        if (!isCompetitionsLoading) {
            document.title = value || 'Toto App';
        }
    }, [isCompetitionsLoading, value]);
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
