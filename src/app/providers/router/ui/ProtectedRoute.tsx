import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect, useMemo } from 'react';
import { Role } from 'shared/api';
import { useAppSelector } from 'shared/store/config';
import { AppRoutes } from 'shared/const/routes';

type Props = {
    requiredRoles?: Partial<Role>[];
};

const ProtectedRoute: FC<Props> = ({ requiredRoles }) => {
    const { isAuth, roles } = useAppSelector((state) => state.user);
    const navigate = useNavigate();

    const hasRequiredRoles = useMemo(() => {
        if (!requiredRoles) {
            return true;
        }

        return requiredRoles.some((requiredRole) => {
            const hasRole = roles?.find(
                (userRole) => userRole.value === requiredRole.value,
            );
            return hasRole;
        });
    }, [requiredRoles, roles]);
    useEffect(() => {
        if (!isAuth) {
            navigate(AppRoutes.MAIN);
        }
        if (!hasRequiredRoles) {
            navigate(AppRoutes.MAIN);
        }
    }, [hasRequiredRoles, isAuth, navigate]);

    return <Outlet />;
};
export default ProtectedRoute;
