import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { UserEditingTable } from 'widgets/UserEditingTable';

const AdminPage = () => {
    return (
        <Container>
            <Title>пользователи</Title>
            <UserEditingTable />
        </Container>
    );
};

export default AdminPage;
