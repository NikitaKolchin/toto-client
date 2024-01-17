import { RouteProps } from 'react-router-dom';
import { MainPage } from '../../../../pages/MainPage';
import { LoginPage } from '../../../../pages/LoginPage';
import { RegistrationPage } from '../../../../pages/RegistrationPage';
import { ForgotPage } from '../../../../pages/ForgotPage';
import { StakesPage } from '../../../../pages/StakesPage';
import { ProfilePage } from '../../../../pages/ProfilePage';
import { InfoPage } from '../../../../pages/InfoPage';
import { ResultPage } from '../../../../pages/ResultPage';
import { AdminPage } from '../../../../pages/AdminPage';
import { Role, Roles } from '../../../../models/Role';
export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    REGISTRATION = 'registration',
    FORGOT = 'forgot',
    STAKES = 'stakes',
    PROFILE = 'profile',
    INFO = 'info',
    RESULT = 'results',
    ADMIN = 'admin',
}

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    requiredRoles?: Role[];
};

export const getRouteMain = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteRegistration = () => '/registration';
export const getRouteForgot = () => '/forgot';
export const getRouteStakes = () => '/stakes';
export const getRouteProfile = () => '/profile';
export const getRouteInfo = () => '/info';
export const getRouteResult = () => '/results';
export const getRouteAdmin = () => '/admin';
// export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },
    [AppRoutes.REGISTRATION]: {
        path: getRouteRegistration(),
        element: <RegistrationPage />,
    },
    [AppRoutes.FORGOT]: {
        path: getRouteForgot(),
        element: <ForgotPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.STAKES]: {
        path: getRouteStakes(),
        element: <StakesPage />,
        authOnly: true,
        requiredRoles: [{ value: Roles.USER }],
    },
    [AppRoutes.INFO]: {
        path: getRouteInfo(),
        element: <InfoPage />,
        authOnly: true,
        requiredRoles: [{ value: Roles.USER }],
    },
    [AppRoutes.RESULT]: {
        path: getRouteResult(),
        element: <ResultPage />,
        authOnly: true,
        requiredRoles: [{ value: Roles.USER }],
    },
    [AppRoutes.ADMIN]: {
        path: getRouteAdmin(),
        element: <AdminPage />,
        authOnly: true,
        requiredRoles: [{ value: Roles.ADMIN }],
    },
    // [AppRoutes.FORBIDDEN]: {
    //     path: getRouteForbidden(),
    //     element: <ForbiddenPage />,
    // },
    // // last
    // [AppRoutes.NOT_FOUND]: {
    //     path: '*',
    //     element: <NotFoundPage />,
    // },
};
