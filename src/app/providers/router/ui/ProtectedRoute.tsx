import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect, useMemo } from 'react';
import { Role } from '../../../../models/Role';
import { useAppSelector } from '../../store/hooks';

type Props = {
    requiredRoles?: Role[];
};

const ProtectedRoute: FC<Props> = ({ requiredRoles }) => {
    const { isLoading, error, isAuth, user } = useAppSelector(
        (state) => state.auth,
    );
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
        if (!isLoading) {
            //|| !user.isActivated || !user.isAllowed
            if (!isAuth) {
                navigate('/');
            }
            if (!hasRequiredRoles) {
                navigate('/');
            }
        }
    }, [hasRequiredRoles, isAuth, isLoading, navigate, user.isActivated]);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        console.error('случилось страшное: ', error);
    }

    return <Outlet />;
};
export default ProtectedRoute;
