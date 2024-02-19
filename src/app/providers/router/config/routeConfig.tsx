import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { LoginPage } from 'pages/LoginPage';
import { RegistrationPage } from 'pages/RegistrationPage';
import { ForgotPage } from 'pages/ForgotPage';
import { StakesPage } from 'pages/StakesPage';
import { ProfilePage } from 'pages/ProfilePage';
import { InfoPage } from 'pages/InfoPage';
import { ResultPage } from 'pages/ResultPage';
import { UsersPage } from 'pages/UsersPage';
import { Role, Roles } from 'entities/User';
import { AppRoutes } from 'shared/const/routes';
import { SettingsPage } from 'pages/SettingsPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    requiredRoles?: Partial<Role>[];
};

export const getRouteMain = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteRegistration = () => '/registration';
export const getRouteForgot = () => '/forgot';
export const getRouteStakes = () => '/stakes';
export const getRouteProfile = () => '/profile';
export const getRouteInfo = () => '/info';
export const getRouteResult = () => '/results';
export const getRouteUsers = () => '/users';
export const getRouteSettings = () => '/settings';
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
    [AppRoutes.USERS]: {
        path: getRouteUsers(),
        element: <UsersPage />,
        authOnly: true,
        requiredRoles: [{ value: Roles.ADMIN }],
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
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
