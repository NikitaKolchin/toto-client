import CompetitionsIcon from "@mui/icons-material/EmojiEvents";
import TeamsIcon from "@mui/icons-material/Flag";
import UsersIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "@/shared/const/routes";
import classNames from "./AdminActions.module.css";

const actions = [
	{
		name: "пользователи",
		route: `..${AppRoutes.USERS}`,
		icon: <UsersIcon />,
	},
	{
		name: "настройки",
		route: `..${AppRoutes.SETTINGS}`,
		icon: <SettingsIcon />,
	},
	{
		name: "турниры",
		route: `..${AppRoutes.COMPETITIONS}`,
		icon: <CompetitionsIcon />,
	},
	{
		name: "команды",
		route: `..${AppRoutes.TEAMS}`,
		icon: <TeamsIcon />,
	},
];

const AdminActions: FC = () => {
	const theme = useTheme();
	const location = useLocation();
	const matchThen600 = useMediaQuery(theme.breakpoints.up("sm"));
	return (
		<Box className={classNames.actions}>
			{actions.map(({ name, route, icon }) => (
				<Button
					key={name}
					component={Link}
					to={{ pathname: route, search: location.search }}
					startIcon={icon}
				>
					{matchThen600 ? name : ""}
				</Button>
			))}
		</Box>
	);
};

export { AdminActions };
