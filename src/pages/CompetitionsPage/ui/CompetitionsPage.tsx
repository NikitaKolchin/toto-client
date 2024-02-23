import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { CompetitionEditingTable } from 'widgets/CompetitionEditingTable';

const CompetitionsPage = () => {
    return (
        <Container>
            <Title>соревнования</Title>
            <CompetitionEditingTable />
        </Container>
    );
};

export default CompetitionsPage;
