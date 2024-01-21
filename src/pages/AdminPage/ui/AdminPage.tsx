import { ChangeEvent, useState } from 'react';
import { User } from '../../../entities/Auth';
import UserService from '../../../entities/Auth/services/UserService';
import {
    useToggleAllowMutation,
    useLazyGetAllUsersQuery,
} from '../../../entities/Auth/services/queriesForUser/queriesForUser';

const AdminPage = () => {
    const [getAllUsers, { data: users }] = useLazyGetAllUsersQuery();
    const [toggleAllow, result] = useToggleAllowMutation();
    async function handleChange(
        event: ChangeEvent<HTMLInputElement>,
    ): Promise<void> {
        const userId = event.target.value as unknown as User['id'];
        toggleAllow(userId);
    }
    console.log(users);

    return (
        <>
            <div>AdminPage</div>
            <div>
                <button onClick={() => getAllUsers()}>
                    Получить пользователей
                </button>
                {users?.map((user) => (
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
