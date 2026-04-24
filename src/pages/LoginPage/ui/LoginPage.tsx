import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { type FC, type SyntheticEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/entities/User";
import { AppRoutes } from "@/shared/const/routes";
import { Loading } from "@/shared/ui/Loading";
import { ShowMessage } from "@/shared/ui/ShowMessage";

const LoginForm: FC = () => {
	const navigate = useNavigate();
	const [login, { isLoading, error, data: response }] = useLoginMutation();

	useEffect(() => {
		if (response?.isAuth) {
			navigate(AppRoutes.MAIN);
		}
	}, [navigate, response?.isAuth]);

	const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		login({ email, password });
	};

	if (isLoading) {
		return <Loading />;
	}
	return (
		<Grid container component="main" sx={{ height: "100vh" }}>
			<Grid
				size={{ xs: false, sm: 4, md: 7 }}
				sx={{
					backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) =>
						t.palette.mode === "light"
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<Grid
				size={{ xs: 12, sm: 8, md: 5 }}
				component={Paper}
				elevation={6}
				square
			>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Войти
					</Typography>
					<Box
						component="form"
						noValidate
						sx={{ mt: 1 }}
						onSubmit={handleSubmit}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Пароль"
							type="password"
							id="password"
							autoComplete="current-password"
						/>

						<Button
							fullWidth
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Войти
						</Button>
						<Grid container spacing={2}>
							<Grid size={12}>
								<Link href="forgot" variant="body2">
									Забыл пароль?
								</Link>
							</Grid>
							<Grid size={12}>
								<Link href="registration" variant="body2">
									{"Ещё нет аккаунта? Зарегистрироваться!"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<ShowMessage error={error} />
			</Grid>
		</Grid>
	);
};
export default LoginForm;
