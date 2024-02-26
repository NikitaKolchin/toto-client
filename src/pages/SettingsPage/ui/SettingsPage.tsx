import { Container } from '@mui/material';
import { Title } from 'entities/Title';
import { AdminActions } from 'features/AdminActions';
import { SettingEditingTable } from 'widgets/SettingEditingTable';

function SettingsPage() {
    return (
        <Container>
            <Title>настройки</Title>
            <AdminActions />
            <SettingEditingTable />
        </Container>
    );
}
export default SettingsPage;
