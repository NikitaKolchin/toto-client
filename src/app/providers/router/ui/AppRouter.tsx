import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AppRoutesProps, routeConfig } from '../config/routeConfig';
import { Loading } from 'shared/ui/Loading';
import { MainLayout } from 'widgets/layout';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        return route.authOnly ? (
            <Route
                key={route.path}
                element={<ProtectedRoute requiredRoles={route.requiredRoles} />}
            >
                <Route path={route.path} element={route.element} />
            </Route>
        ) : (
            <Route key={route.path} path={route.path} element={route.element} />
        );
    }, []);
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {Object.values(routeConfig).map(renderWithWrapper)}
                </Route>
            </Routes>
        </Suspense>
    );
};
export default AppRouter;
