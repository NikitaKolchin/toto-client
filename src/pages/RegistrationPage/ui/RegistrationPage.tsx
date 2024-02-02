import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MessageResponse, useRegistrationMutation } from 'entities/User';
import { useAppSelector } from 'shared/store/config';
import { Alert, Grow } from '@mui/material';

type Props = object;

const RegistrationPage = (props: Props) => {
    const [email, setEmail] = useState<string>('');
    const [alias, setAlias] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [registration, { error }] = useRegistrationMutation();
    const navigate = useNavigate();
    const { email: respEmail, severity } = useAppSelector(
        (state) => state.user,
    );
    useEffect(() => {
        if (respEmail) {
            navigate('/login');
        }
    }, [navigate, respEmail]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setAlias(e.target.value)}
                                value={alias}
                                label="Игровое имя"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                label="Настоящее имя"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setSecondName(e.target.value)}
                                value={secondName}
                                label="Настоящая фамилия"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                label="Email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                label="Пароль"
                                type="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={() =>
                            registration({
                                email,
                                password,
                                alias,
                                firstName,
                                secondName,
                            })
                        }
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="login" variant="body2">
                                Уже зарегистрированы? Войти!
                            </Link>
                        </Grid>
                    </Grid>
                    {error && (
                        <Grow in={!!error}>
                            <Alert severity={severity}>
                                {'data' in error
                                    ? (error.data as MessageResponse).message
                                    : ''}
                            </Alert>
                        </Grow>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default RegistrationPage;
