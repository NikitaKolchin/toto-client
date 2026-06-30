import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { type FC, type PropsWithChildren, useState } from "react";
import { type To, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/entities/User";
import { AppRoutes } from "@/shared/const/routes";
import { useAppSelector } from "@/shared/store/config";

type TotoMenuItem = {
	name: string;
	value: string;
};
const menuItems: TotoMenuItem[] = [
	{ name: "Toto Online", value: AppRoutes.MAIN },
	{ name: "Ставки", value: AppRoutes.STAKES },
	{ name: "Результаты", value: AppRoutes.RESULT },
	{ name: "Статистика", value: AppRoutes.STATS },
	{ name: "Информация", value: AppRoutes.INFO },
];

function Header() {
	const [logout] = useLogoutMutation();
	const { isAuth, isActivated } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const matchThen600 = useMediaQuery(theme.breakpoints.up("sm"));
	const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
		null,
	);
	const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

	const handleMainMenu = () => {
		setIsMainMenuOpen((current) => !current);
	};

	const handleCloseMainMenu = () => {
		setIsMainMenuOpen(false);
	};

	const handleMainMenuNavigate = (value: To) => {
		handleCloseMainMenu();

		if (location.pathname !== value) {
			navigate(value);
		}
	};

	const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAccountAnchorEl(event.currentTarget);
	};

	const handleCloseAccountMenu = () => {
		setAccountAnchorEl(null);
	};

	const handleProfile = () => {
		setAccountAnchorEl(null);
		if (location.pathname !== AppRoutes.PROFILE) {
			navigate(AppRoutes.PROFILE);
		}
	};

	const handleLogout = () => {
		setAccountAnchorEl(null);
		logout();
	};

	const handleLogin = () => {
		setAccountAnchorEl(null);
		navigate(AppRoutes.LOGIN);
	};
	const primaryTextColor = theme.palette.text.primary;
	const secondaryMainColor = theme.palette.secondary.main;
	const HeaderLink: FC<
		PropsWithChildren<TotoMenuItem & { isAuth: boolean; isActivated: boolean }>
	> = (props) => {
		if (props.isAuth && props.isActivated) {
			return (
				<Typography
					onClick={() => {
						if (location.pathname !== props.value) {
							navigate(props.value);
						}
					}}
					variant="h6"
					color={secondaryMainColor}
					sx={{
						textDecoration: "none",
						cursor: "pointer",
						textTransform: "lowercase",
						"&:hover": {
							textDecoration: "underline",
						},
					}}
				>
					{props.children}
				</Typography>
			);
		}
		return (
			<Typography
				variant="h6"
				color={secondaryMainColor}
				sx={{
					"&:hover": {
						textDecoration: "underline",
					},
				}}
				style={{ textTransform: "lowercase", cursor: "not-allowed" }}
			>
				{props.children}
			</Typography>
		);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{!matchThen600 && isAuth && isActivated && (
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={handleMainMenu}
						>
							<MenuIcon />
						</IconButton>
					)}
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center",
						}}
					>
						{matchThen600 &&
							menuItems.map((item) => (
								<HeaderLink
									key={item.value}
									isAuth={isAuth}
									isActivated={isActivated}
									{...item}
								>
									{item.name}
								</HeaderLink>
							))}
					</Box>

					<Box>
						{isAuth ? (
							<>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleAccountMenu}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									anchorEl={accountAnchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(accountAnchorEl)}
									onClose={handleCloseAccountMenu}
								>
									<MenuItem onClick={handleProfile}>профиль игрока</MenuItem>
									<MenuItem onClick={handleLogout}>выйти </MenuItem>
								</Menu>
							</>
						) : (
							<Button color="secondary" onClick={handleLogin}>
								войти
							</Button>
						)}
					</Box>
				</Toolbar>
				{!matchThen600 && isAuth && isActivated && (
					<Drawer
						open={isMainMenuOpen}
						onClose={() => setIsMainMenuOpen(false)}
					>
						<List
							sx={{
								borderTop: 1,
								borderColor: "primary.dark",
							}}
						>
							{menuItems.map((item) => (
								<ListItemButton
									key={item.value}
									selected={location.pathname === item.value}
									onClick={() => handleMainMenuNavigate(item.value)}
								>
									<ListItemText
										primary={item.name}
										slotProps={{
											primary: {
												color: primaryTextColor,
												textTransform: "lowercase",
											},
										}}
									/>
								</ListItemButton>
							))}
						</List>
					</Drawer>
				)}
			</AppBar>
		</Box>
	);
}

export default Header;
