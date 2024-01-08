import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

type Props = object;

const Main: FC = (props: Props) => {
    const { isLoading, error, isAuth, user } = useAppSelector(
        (state) => state.auth,
    );

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        console.error('случилось страшное: ', error);
    }

    return (
        <Container>
            <h1>
                {isAuth
                    ? `Пользователь авторизован ${user.email}`
                    : 'АВТОРИЗУЙТЕСЬ'}
            </h1>
            <h1>
                {user.isActivated
                    ? 'Аккаунт подтвержден по почте'
                    : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}
            </h1>
            <h1>
                {user.isAllowed
                    ? 'Участие подтверждено'
                    : 'Необходимо подтверждение участия'}
            </h1>
            <div>
                <Link to="profile">user</Link>
            </div>
        </Container>
    );
};

export default Main;
