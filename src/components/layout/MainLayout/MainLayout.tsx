import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import AuthController from '../../../controllers/AuthController';

const Layout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(AuthController.checkAuth());
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
