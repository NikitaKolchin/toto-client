import { FC, useEffect } from 'react';
import {
    User,
    setMailSended,
    setActivationCodeSended,
    useActivateUserMutation,
    useSendCodeMutation,
    setConfirmationCode,
    setActivationCodeSending,
    setMailSending,
} from 'entities/User';
import { useAppDispatch, useAppSelector } from 'shared/store/config';

const ConfirmEmail: FC<User> = (user) => {
    const dispatch = useAppDispatch();
    const {
        mailSended,
        mailSending,
        activationCodeSended,
        activationCodeSending,
        message,
        confirmationCode,
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
            activateUser({ email: user.email, confirmationCode });
            dispatch(setActivationCodeSended(true));
        }
    }, [
        activationCodeSended,
        activationCodeSending,
        activateUser,
        confirmationCode,
        user.email,
        dispatch,
    ]);

    useEffect(() => {
        if (confirmationCode.length > 3) {
            dispatch(setActivationCodeSending(true));
        }
    }, [confirmationCode, dispatch]);

    return (
        <>
            {!mailSended && (
                <button onClick={() => dispatch(setMailSending(true))}>
                    ConfirmEmail
                </button>
            )}
            {mailSended && (
                <>
                    <div>
                        <input
                            type="text"
                            disabled={activationCodeSended}
                            value={confirmationCode}
                            onChange={(e) =>
                                dispatch(
                                    setConfirmationCode(e.currentTarget.value),
                                )
                            }
                        />
                    </div>
                    <div>{message}</div>
                </>
            )}
        </>
    );
};

export { ConfirmEmail };
