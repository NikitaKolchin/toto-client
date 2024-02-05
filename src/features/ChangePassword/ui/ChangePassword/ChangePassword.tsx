import { Button, Grow, Stack, TextField } from '@mui/material';
import {
    setActivationCode,
    setActivationCodeSended,
    setMailSended,
    useChangePasswordAlienMutation,
    useSendCodeMutation,
    setMessage,
} from 'entities/User';
import { ShowMessage } from 'shared/ui/ShowMessage';
import { FC, useState, useEffect } from 'react';
import { useCanSend } from 'shared/hooks/useCanSend/useCanSend';
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
    const canSend = useCanSend({ password, confirmPassword, activationCode });
    const [changePasswordAlien] = useChangePasswordAlienMutation();
    const [sendCode, { error }] = useSendCodeMutation();

    useEffect(() => {
        dispatch(
            setMessage({
                message: canSend.message,
                severity: canSend.enable ? 'info' : 'error',
            }),
        );

        return () => {
            dispatch(setActivationCodeSended(false));
            dispatch(setMailSended(false));
            setMessage({
                message: '',
                severity: 'info',
            });
        };
    }, [canSend, dispatch]);

    useEffect(() => {
        if (mailSended) {
            sendCode({ email });
        }
    }, [mailSended, email, sendCode]);
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
            {mailSended && !error && (
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
                </>
            )}
            <Grow in={mailSended}>
                <Button
                    disabled={changePassword || !canSend.enable}
                    onClick={() => setChangePassword(true)}
                >
                    Изменить пароль
                </Button>
            </Grow>
            <ShowMessage message={message} severity={severity} error={error} />
        </Stack>
    );
};

export { ChangePassword };
