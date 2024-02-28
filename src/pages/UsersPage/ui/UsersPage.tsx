import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { AdminActions } from 'features/AdminActions';
import { UserEditingTable } from 'widgets/UserEditingTable';

const UsersPage = () => {
    return (
        <Container sx={{ mb: 5 }}>
            <Title>пользователи</Title>
            <AdminActions />
            <UserEditingTable />
        </Container>
    );
};

export default UsersPage;
