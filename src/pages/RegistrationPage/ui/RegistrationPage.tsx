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
import { setMessage, useRegistrationMutation } from 'entities/User';
import { useAppDispatch, useAppSelector } from 'shared/store/config';
import { useCanSend } from 'shared/hooks/useCanSend/useCanSend';
import { ShowMessage } from 'shared/ui/ShowMessage';

const RegistrationPage = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [alias, setAlias] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registration, { error }] = useRegistrationMutation();
    const navigate = useNavigate();
    const canSend = useCanSend({ password, confirmPassword });
    const {
        email: respondedEmail,
        severity,
        message,
    } = useAppSelector((state) => state.user);
    useEffect(() => {
        if (respondedEmail) {
            navigate('/login');
        }
    }, [navigate, respondedEmail]);

    useEffect(() => {
        dispatch(
            setMessage({
                message: canSend.message,
                severity: canSend.enable ? 'info' : 'error',
            }),
        );
        return () => {
            setMessage({
                message: '',
                severity: 'info',
            });
        };
    }, [canSend, dispatch]);

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
                        <Grid item xs={12}>
                            <TextField
                                label="Подтвердите новый пароль"
                                required
                                fullWidth
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.currentTarget.value)
                                }
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
                        disabled={!canSend.enable}
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
                    <ShowMessage
                        message={message}
                        error={error}
                        severity={severity}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default RegistrationPage;
