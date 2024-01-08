import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';

const ProtectedRoute = () => {
    const { isLoading, error, isAuth, user } = useAppSelector(
        (state) => state.auth,
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && (!isAuth || !user.isActivated)) {
            // || !user.isAllowed
            navigate('/');
        }
    }, [isAuth, isLoading, navigate, user.isActivated]);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        console.error('случилось страшное: ', error);
    }

    return <Outlet />;
};
export default ProtectedRoute;
