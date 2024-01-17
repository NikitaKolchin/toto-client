import { FC } from 'react';
import { Link } from 'react-router-dom';
import ConfirmEmail from '../../../components/containers/ConfirmEmail/ConfirmEmail';
import { useAppSelector } from '../../../app/providers/store';
import { ToggleTheme } from '../../../app/providers/theme';

type Props = object;

const ProfileScreen: FC = (props: Props) => {
    const { isLoading, error, user } = useAppSelector((state) => state.auth);

    if (error) {
        console.error('случилось страшное: ', error);
    }

    return (
        <>
            <div>
                профиль пользователя {isLoading ? 'Загрузка...' : user.email}
            </div>
            <ToggleTheme />
            <ConfirmEmail {...user} />
            <Link to={'../admin'}>admin</Link>
        </>
    );
};

export default ProfileScreen;
