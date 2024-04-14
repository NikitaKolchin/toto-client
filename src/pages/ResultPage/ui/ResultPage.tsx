import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { ResultTable } from 'widgets/ResultTable';

function ResultPage() {
    return (
        <Container sx={{ mb: 5 }}>
            <Title>результаты</Title>
            <ResultTable />
        </Container>
    );
}
export default ResultPage;
