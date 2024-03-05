import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { MatchesEditingTable } from 'widgets/MatchesEditingTable';

const InfoPage = () => {
    return (
        <Container sx={{ mb: 5 }}>
            <Title>матчи</Title>
            <MatchesEditingTable />
        </Container>
    );
};

export default InfoPage;
