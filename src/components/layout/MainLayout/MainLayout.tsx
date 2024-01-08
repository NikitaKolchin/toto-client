import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { checkAuth } from '../../../store/authSlice';
import { useAppDispatch } from '../../../store/hooks';

const Layout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, [dispatch]);

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
