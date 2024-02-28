import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { AdminActions } from 'features/AdminActions';
import { NationEditingTable } from 'widgets/NationEditingTable';

const NationsPage = () => {
    return (
        <Container sx={{ mb: 5 }}>
            <Title>страны</Title>
            <AdminActions />
            <NationEditingTable />
        </Container>
    );
};

export default NationsPage;
