import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { AdminActions } from 'features/AdminActions';
import { CompetitionEditingTable } from 'widgets/CompetitionEditingTable';

const CompetitionsPage = () => {
    return (
        <Container>
            <Title>соревнования</Title>
            <AdminActions />
            <CompetitionEditingTable />
        </Container>
    );
};

export default CompetitionsPage;
