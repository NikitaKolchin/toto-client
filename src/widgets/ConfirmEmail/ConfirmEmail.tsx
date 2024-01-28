import { FC, useEffect } from 'react';
import {
    User,
    setMailSended,
    setActivationCodeSended,
    useActivateUserMutation,
    useSendCodeMutation,
    setActivationCode,
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
        activationCode,
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
            {!mailSended && !user.isActivated && (
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
                            value={activationCode}
                            onChange={(e) =>
                                dispatch(
                                    setActivationCode(e.currentTarget.value),
                                )
                            }
                        />
                    </div>
                </>
            )}
            <div>{message}</div>
        </>
    );
};

export { ConfirmEmail };
