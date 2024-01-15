import { FC, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { User } from '../../../models/User';
import UserService from '../../../services/UserService';
import ToggleTheme from '../../../components/theme/ToggleTheme/ToggleTheme';
import { Link } from 'react-router-dom';
import ConfirmEmail from '../../../components/containers/ConfirmEmail/ConfirmEmail';

type Props = object;

const ProfileScreen: FC = (props: Props) => {
    const [users, setUsers] = useState<User[]>([]);

    const { isLoading, error, user } = useAppSelector((state) => state.auth);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        console.error('случилось страшное: ', error);
    }

    return (
        <>
            <div>профиль пользователя {user.email}</div>
            <ToggleTheme />
            <div>
                <button onClick={getUsers}>Получить пользователей</button>
                {users.map((user) => (
                    <div key={user.email}>{user.email}</div>
                ))}
            </div>
            <ConfirmEmail {...user} />
            <Link to={'../info'}>info</Link>
        </>
    );
};

export default ProfileScreen;
