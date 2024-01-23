import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect, useMemo } from 'react';
import { Role } from '../../../../entities/Auth';
import { useAppSelector } from '../../store';

type Props = {
    requiredRoles?: Role[];
};

const ProtectedRoute: FC<Props> = ({ requiredRoles }) => {
    const { isAuth, user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    const hasRequiredRoles = useMemo(() => {
        if (!requiredRoles) {
            return true;
        }

        return requiredRoles.some((requiredRole) => {
            const hasRole = user.roles?.find(
                (userRole) => userRole.value === requiredRole.value,
            );
            return hasRole;
        });
    }, [requiredRoles, user.roles]);
    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
        if (!hasRequiredRoles) {
            navigate('/');
        }
    }, [hasRequiredRoles, isAuth, navigate, user.isActivated]);

    return <Outlet />;
};
export default ProtectedRoute;
