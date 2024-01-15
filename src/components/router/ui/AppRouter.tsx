import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ForgotPage } from '../../../pages/ForgotPage';
import { InfoPage } from '../../../pages/InfoPage';
import { LoginPage } from '../../../pages/LoginPage';
import { MainPage } from '../../../pages/MainPage';
import { ProfilePage } from '../../../pages/ProfilePage';
import { RegistrationPage } from '../../../pages/RegistrationPage';
import { ResultPage } from '../../../pages/ResultPage';
import { StakesPage } from '../../../pages/StakesPage';
import { AdminPage } from '../../../pages/AdminPage';
import MainLayout from '../../layout/MainLayout/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Loading from '../../shared/Loading';
import { AppRoutesProps, routeConfig } from '../config/routeConfig';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <Route path={route.path} element={<ProtectedRoute />}>
                            {route.element}
                        </Route>
                    ) : (
                        route.element
                    )
                }
            />
        );
    }, []);
    console.log(Object.values(routeConfig).map(renderWithWrapper));
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {Object.values(routeConfig).map(renderWithWrapper)}
                </Route>
            </Routes>
        </Suspense>
    );
    // return (
    //     <Suspense fallback={<Loading />}>
    //         <Routes>
    //             <Route path="/" element={<MainLayout />}>
    //                 <Route index element={<MainPage />} />
    //                 <Route path="/login" element={<LoginPage />} />
    //                 <Route
    //                     path="/registration"
    //                     element={<RegistrationPage />}
    //                 />
    //                 <Route path="/forgot" element={<ForgotPage />} />
    //                 <Route element={<ProtectedRoute />}>
    //                     <Route path="/stakes" element={<StakesPage />} />
    //                     <Route path="/profile" element={<ProfilePage />} />
    //                     <Route path="/info" element={<InfoPage />} />
    //                     <Route path="/results" element={<ResultPage />} />
    //                     <Route path="/admin" element={<AdminPage />} />
    //                 </Route>
    //             </Route>
    //         </Routes>
    //     </Suspense>
    // );
};
export default AppRouter;
