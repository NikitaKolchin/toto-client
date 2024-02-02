import { FC, useEffect } from 'react';
import {
    setMailSended,
    setActivationCodeSended,
    useActivateUserMutation,
    useSendCodeMutation,
    setActivationCode,
    setActivationCodeSending,
    setMailSending,
    UserState,
} from 'entities/User';
import { useAppDispatch, useAppSelector } from 'shared/store/config';
import { TextField, Button, Grow, Stack, Alert } from '@mui/material';

const ConfirmEmail: FC<UserState> = (user) => {
    const dispatch = useAppDispatch();
    const {
        mailSended,
        mailSending,
        activationCodeSended,
        activationCodeSending,
        message,
        activationCode,
        severity,
    } = useAppSelector((state) => state.user);
    const [activateUser] = useActivateUserMutation();
    const [sendCode] = useSendCodeMutation();

    useEffect(() => {
        if (mailSending && !mailSended) {
            sendCode(user.email);
            dispatch(setMailSended(true));
        }
    }, [dispatch, mailSended, mailSending, sendCode, user.email]);

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

    return (
        <>
            <Stack spacing={2}>
                <Grow in={!mailSended && !user.isActivated}>
                    <Button
                        fullWidth
                        onClick={() => dispatch(setMailSending(true))}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Направить письмо с кодом активации
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
        </>
    );
};

export { ConfirmEmail };
