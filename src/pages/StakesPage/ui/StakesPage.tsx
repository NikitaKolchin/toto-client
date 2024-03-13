import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { StakeEditingTable } from 'widgets/StakeEditingTable';

const StakesPage = () => {
    return (
        <Container sx={{ mb: 5 }}>
            <Title>ставки</Title>
            <StakeEditingTable />
        </Container>
    );
};

export default StakesPage;
