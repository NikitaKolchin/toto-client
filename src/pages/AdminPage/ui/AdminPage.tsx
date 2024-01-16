import { ChangeEvent, useState } from 'react';
import { User } from '../../../models/User';
import UserService from '../../../services/UserService';

const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([]);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    async function handleChange(
        event: ChangeEvent<HTMLInputElement>,
    ): Promise<void> {
        const userId = event.target.value as unknown as User['id'];
        const returnedUser = await UserService.toggleAllow(userId);
        if (returnedUser.id) {
            setUsers(
                users.map((user) => {
                    if (user.id === returnedUser.id) {
                        return returnedUser;
                    }
                    return user;
                }) as User[],
            );
        }
    }

    return (
        <>
            <div>AdminPage</div>
            <div>
                <button onClick={getUsers}>Получить пользователей</button>
                {users.map((user) => (
                    <div key={user.email}>
                        <label>
                            {user.email}
                            <input
                                type="checkbox"
                                name="allow"
                                defaultChecked={user.isAllowed}
                                value={user.id}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminPage;
