import { FC, useEffect, useState } from 'react';
import {
    setActivationCodeSended,
    useActivateUserMutation,
    useSendCodeMutation,
    setActivationCode,
    setActivationCodeSending,
    UserState,
} from '@/entities/User';
import { useAppDispatch, useAppSelector } from '@/shared/store/config';
import { TextField, Button, Grow, Stack, Alert } from '@mui/material';

const ConfirmEmail: FC<UserState> = (user) => {
    const dispatch = useAppDispatch();
    const {
        mailSended,
        activationCodeSended,
        activationCodeSending,
        message,
        activationCode,
        severity,
    } = useAppSelector((state) => state.user);
    const [activateUser] = useActivateUserMutation();
    const [sendCode, { isLoading: isSendingCode }] = useSendCodeMutation();
    const [cooldownSec, setCooldownSec] = useState(0);

    useEffect(() => {
        if (cooldownSec <= 0) {
            return;
        }
        const interval = setInterval(() => {
            setCooldownSec((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [cooldownSec]);

    useEffect(() => {
        if (activationCodeSending && !activationCodeSended) {
            activateUser({ email: user.email, activationCode });
            dispatch(setActivationCodeSended(true));
        }
    }, [
        activationCodeSended,
        activationCodeSending,
        activateUser,
        activationCode,
        user.email,
        dispatch,
    ]);

    useEffect(() => {
        if (activationCode.length > 3) {
            dispatch(setActivationCodeSending(true));
        }
    }, [activationCode, dispatch]);

    const handleSendCode = async () => {
        if (cooldownSec > 0 || isSendingCode) {
            return;
        }
        try {
            await sendCode({ email: user.email }).unwrap();
            setCooldownSec(60);
        } catch {
            // error is handled by RTK query state/slice
        }
    };

    return (
        <Stack spacing={2}>
            <Grow in={!mailSended && !user.isActivated}>
                <Button
                    fullWidth
                    disabled={isSendingCode || cooldownSec > 0}
                    onClick={handleSendCode}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {cooldownSec > 0
                        ? `Повторная отправка через ${cooldownSec}с`
                        : 'Направить письмо с кодом активации'}
                </Button>
            </Grow>
            <Grow in={mailSended}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    disabled={activationCodeSended}
                    onChange={(e) =>
                        dispatch(setActivationCode(e.currentTarget.value))
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
        </Stack>
    );
};

export { ConfirmEmail };
