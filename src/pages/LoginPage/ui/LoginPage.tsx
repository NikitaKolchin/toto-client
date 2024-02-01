import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useLoginMutation } from 'entities/User';
import { Loading } from 'shared/ui/Loading';
import { Alert, Grow } from '@mui/material';
import { MessageResponse } from 'entities/User';
import { useAppSelector } from 'shared/store/config';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { severity } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const [login, { isLoading, error, data: response }] = useLoginMutation();

    useEffect(() => {
        if (response?.isAuth) {
            navigate('/');
        }
    }, [navigate, response?.isAuth]);

    if (isLoading) {
        return <Loading />;
    }
    console.log('sev', response?.severity);

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage:
                        'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light'
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Войти
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            fullWidth
                            onClick={() => login({ email, password })}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="forgot" variant="body2">
                                    Забыл пароль?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="registration" variant="body2">
                                    {'Ещё нет аккаунта? Зарегистрироваться!'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {error && (
                    <Grow in={!!error}>
                        <Alert severity={severity}>
                            {'data' in error
                                ? (error.data as MessageResponse).message
                                : ''}
                        </Alert>
                    </Grow>
                )}
            </Grid>
        </Grid>
    );
};
export default LoginForm;
