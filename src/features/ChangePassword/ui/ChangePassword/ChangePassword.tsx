import {
    setActivationCode,
    setMailSended,
    useChangePasswordAlienMutation,
    useSendCodeMutation,
} from 'entities/User';
import { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/store/config';

const ChangePassword: FC = () => {
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
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);

    const [changePasswordAlien, { data: messageChangePasswordAlien }] =
        useChangePasswordAlienMutation();
    const [sendCode, { data: messageSendCode }] = useSendCodeMutation();

    useEffect(() => {
        if (mailSended) {
            sendCode(email);
        }
    }, [mailSended, email, sendCode]);

    useEffect(() => {
        if (changePassword) {
            changePasswordAlien({
                email,
                newPassword,
                activationCode,
            });
        }
    }, [
        changePassword,
        changePasswordAlien,
        activationCode,
        email,
        newPassword,
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
                    <button onClick={() => dispatch(setMailSended(true))}>
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
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.currentTarget.value)
                            }
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
                            value={activationCode}
                            onChange={(e) =>
                                dispatch(
                                    setActivationCode(e.currentTarget.value),
                                )
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

export { ChangePassword };
