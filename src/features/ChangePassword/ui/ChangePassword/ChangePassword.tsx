import { Alert, Button, Grow, Stack, TextField } from '@mui/material';
import {
    setActivationCode,
    setActivationCodeSended,
    setMailSended,
    useChangePasswordAlienMutation,
    useSendCodeMutation,
    setMessage,
} from 'entities/User';
import { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/store/config';

const ChangePassword: FC = () => {
    const dispatch = useAppDispatch();
    const {
        mailSended,
        activationCodeSended,
        message,
        activationCode,
        severity,
    } = useAppSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [canSend, setCanSend] = useState(false);

    const [changePasswordAlien] = useChangePasswordAlienMutation();
    const [sendCode] = useSendCodeMutation();

    useEffect(() => {
        return () => {
            dispatch(setActivationCodeSended(false));
            dispatch(setMailSended(false));
        };
    }, [dispatch]);

    useEffect(() => {
        if (!password) {
            return;
        }
        if (password !== confirmPassword) {
            dispatch(
                setMessage({
                    message: 'Пароли не совпадают',
                    severity: 'error',
                }),
            );
            setCanSend(false);
        } else {
            dispatch(
                setMessage({
                    message: '',
                    severity: 'info',
                }),
            );
            setCanSend(!!activationCode);
        }
    }, [password, confirmPassword, dispatch, activationCode]);

    useEffect(() => {
        if (mailSended) {
            sendCode({ email });
        }
    }, [mailSended, email, sendCode]);
    console.log(canSend);
    useEffect(() => {
        if (changePassword && !activationCodeSended) {
            dispatch(setActivationCodeSended(true));
            changePasswordAlien({
                email,
                password,
                activationCode,
            });
        }
    }, [
        changePassword,
        changePasswordAlien,
        activationCode,
        email,
        password,
        dispatch,
        activationCodeSended,
    ]);

    return (
        <Stack spacing={2}>
            <>
                <TextField
                    label="Укажите email для отправки кода"
                    autoComplete="email"
                    required
                    fullWidth
                    disabled={mailSended}
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <Grow in={!mailSended && !!email}>
                    <Button onClick={() => dispatch(setMailSended(true))}>
                        Направить код на email
                    </Button>
                </Grow>
            </>
            {mailSended && (
                <>
                    <Grow in={mailSended}>
                        <TextField
                            label="Укажите новый пароль"
                            required
                            fullWidth
                            type="password"
                            disabled={changePassword}
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </Grow>
                    <Grow in={mailSended}>
                        <TextField
                            label="Подтвердите новый пароль"
                            required
                            fullWidth
                            type="password"
                            disabled={changePassword}
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.currentTarget.value)
                            }
                        />
                    </Grow>
                    <Grow in={mailSended}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            disabled={activationCodeSended}
                            onChange={(e) =>
                                dispatch(
                                    setActivationCode(e.currentTarget.value),
                                )
                            }
                            value={activationCode}
                            id="code"
                            label="Код"
                            name="code"
                            autoComplete="number"
                            autoFocus
                        />
                    </Grow>
                    <Grow in={!!message}>
                        <Alert severity={severity}>{message}</Alert>
                    </Grow>
                </>
            )}
            <Grow in={mailSended}>
                <Button
                    disabled={changePassword || !canSend}
                    onClick={() => setChangePassword(true)}
                >
                    Изменить пароль
                </Button>
            </Grow>
        </Stack>
    );
};

export { ChangePassword };
