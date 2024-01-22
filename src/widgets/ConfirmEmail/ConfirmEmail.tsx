import { FC, useEffect, useState } from 'react';
import {
    User,
    useLazyActivateQuery,
    useLazySendCodeQuery,
} from 'entities/Auth';

const ConfirmEmail: FC<User> = (user) => {
    const [mailSended, setMailSended] = useState(false);
    const [activate, setActivate] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');

    const [activateUser, { data: messageActivate }] = useLazyActivateQuery();
    const [sendCode, { data: messageSendCode }] = useLazySendCodeQuery();

    useEffect(() => {
        if (mailSended) {
            sendCode(user.email);
        }
    }, [mailSended, sendCode, user.email]);

    useEffect(() => {
        if (activate) {
            activateUser({ email: user.email, confirmationCode });
        }
    }, [activate, activateUser, confirmationCode, user.email]);

    return (
        <>
            {!mailSended && (
                <button onClick={() => setMailSended(true)}>
                    ConfirmEmail
                </button>
            )}
            {mailSended && (
                <>
                    <div>
                        <input
                            type="text"
                            disabled={activate}
                            value={confirmationCode}
                            onChange={(e) =>
                                setConfirmationCode(e.currentTarget.value)
                            }
                        />
                    </div>
                    <div>{messageSendCode?.message}</div>
                    <div>{messageActivate?.message}</div>
                </>
            )}
            {messageSendCode && (
                <button disabled={activate} onClick={() => setActivate(true)}>
                    Activate
                </button>
            )}
        </>
    );
};

export { ConfirmEmail };
