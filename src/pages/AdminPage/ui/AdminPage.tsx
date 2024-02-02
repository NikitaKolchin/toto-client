import { ChangeEvent } from 'react';
import {
    useToggleAllowMutation,
    useLazyGetAllUsersQuery,
    UserState,
} from 'entities/User';

const AdminPage = () => {
    const [getAllUsers, { data: users }] = useLazyGetAllUsersQuery();
    const [toggleAllow, result] = useToggleAllowMutation();
    async function handleChange(
        event: ChangeEvent<HTMLInputElement>,
    ): Promise<void> {
        const userId = event.target.value as unknown as UserState['id'];
        toggleAllow(userId);
    }

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
