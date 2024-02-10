import { Title } from 'entities/Title';
import { UserEditingTable } from 'features/UserEditingTable';

const AdminPage = () => {
    return (
        <>
            <Title>пользователи</Title>
            <UserEditingTable />
        </>
    );
};

export default AdminPage;
