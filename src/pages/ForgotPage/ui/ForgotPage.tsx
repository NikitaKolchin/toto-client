import {
    useLazyChangePasswordAlienQuery,
    useLazySendCodeQuery,
} from 'entities/Auth';
import { useState, useEffect } from 'react';

const ForgotPage = () => {
    const [email, setEmail] = useState('');
    const [mailSended, setMailSended] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');

    const [changePasswordAlien, { data: messageChangePasswordAlien }] =
        useLazyChangePasswordAlienQuery();
    const [sendCode, { data: messageSendCode }] = useLazySendCodeQuery();

    useEffect(() => {
        if (mailSended) {
            sendCode(email);
        }
    }, [mailSended, email, sendCode]);

    useEffect(() => {
        if (changePassword) {
            changePasswordAlien({ email, password, confirmationCode });
        }
    }, [
        changePassword,
        changePasswordAlien,
        confirmationCode,
        email,
        password,
    ]);

    return (
        <>
            <h1>change password</h1>
            {!mailSended && (
                <div>
                    <input
                        type="text"
                        disabled={mailSended}
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <button onClick={() => setMailSended(true)}>
                        SendEmail
                    </button>
                </div>
            )}
            {mailSended && (
                <>
                    <div>
                        <input
                            type="password"
                            disabled={changePassword}
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                        <input
                            type="password"
                            disabled={changePassword}
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.currentTarget.value)
                            }
                        />
                        <input
                            type="text"
                            disabled={changePassword}
                            value={confirmationCode}
                            onChange={(e) =>
                                setConfirmationCode(e.currentTarget.value)
                            }
                        />
                    </div>
                    <div>{messageSendCode?.message}</div>
                    <div>{messageChangePasswordAlien?.message}</div>
                </>
            )}
            {messageSendCode && (
                <button
                    disabled={changePassword}
                    onClick={() => setChangePassword(true)}
                >
                    Change password
                </button>
            )}
        </>
    );
};

export default ForgotPage;
