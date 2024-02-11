import { Title } from 'entities/Title';
import { UserEditingTable } from 'widgets/UserEditingTable';

const AdminPage = () => {
    return (
        <>
            <Title>пользователи</Title>
            <UserEditingTable />
        </>
    );
};

export default AdminPage;
