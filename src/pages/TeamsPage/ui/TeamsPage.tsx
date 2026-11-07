import { Container } from "@mui/material";
import { Title } from "@/entities/Title";
import { AdminActions } from "@/features/AdminActions";
import { TeamEditingTable } from "@/widgets/TeamEditingTable";

const TeamsPage = () => {
	return (
		<Container sx={{ mb: 5 }}>
			<Title>команды</Title>
			<AdminActions />
			<TeamEditingTable />
		</Container>
	);
};

export default TeamsPage;
