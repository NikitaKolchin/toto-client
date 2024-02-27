import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { AdminActions } from 'features/AdminActions';
import { CompetitionEditingTable } from 'widgets/CompetitionEditingTable';

const NationsPage = () => {
    return (
        <Container>
            <Title>страны</Title>
            <AdminActions />
            <CompetitionEditingTable />
        </Container>
    );
};

export default NationsPage;
