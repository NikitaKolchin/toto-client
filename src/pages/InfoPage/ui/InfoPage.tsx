import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { MatchEditingTable } from 'widgets/MatchEditingTable';

const InfoPage = () => {
    return (
        <Container sx={{ mb: 5 }}>
            <Title>матчи</Title>
            <MatchEditingTable />
        </Container>
    );
};

export default InfoPage;
