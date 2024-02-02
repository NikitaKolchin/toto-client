import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect, useMemo } from 'react';
import { Role } from 'entities/User';
import { useAppSelector } from 'shared/store/config';

type Props = {
    requiredRoles?: Partial<Role>[];
};

const ProtectedRoute: FC<Props> = ({ requiredRoles }) => {
    const { isAuth, roles, isActivated } = useAppSelector(
        (state) => state.user,
    );
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
            navigate('/');
        }
        if (!hasRequiredRoles) {
            navigate('/');
        }
    }, [hasRequiredRoles, isAuth, navigate, isActivated]);

    return <Outlet />;
};
export default ProtectedRoute;
