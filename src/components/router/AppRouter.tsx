import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPage from '../../pages/ForgotPage/ForgotPage';
import InfoPage from '../../pages/InfoPage/InfoPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import { MainPage } from '../../pages/MainPage';
import ProfileScreen from '../../pages/ProfilePage/ProfilePage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import ResultPage from '../../pages/ResultPage/ResultPage';
import { StakesPage } from '../../pages/StakesPage';
import MainLayout from '../layout/MainLayout/MainLayout';
import ProtectedRoute from '../layout/ProtectedRoute/ProtectedRoute';
import Loading from '../shared/Loading';
import { useAppSelector } from '../../store/hooks';
import AdminPage from '../../pages/AdminPage/AdminPage';

const AppRouter = () => {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/registration"
                        element={<RegistrationPage />}
                    />
                    <Route path="/forgot" element={<ForgotPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/stakes" element={<StakesPage />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route path="/info" element={<InfoPage />} />
                        <Route path="/results" element={<ResultPage />} />
                    </Route>
                    {user.isActivated ? (
                        <Route path="/admin" element={<AdminPage />} />
                    ) : (
                        ''
                    )}
                </Route>
            </Routes>
        </Suspense>
    );
};
export default AppRouter;
