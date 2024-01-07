import { FC, useEffect, useState } from 'react';
import { User } from '../../../models/User';
import UserService from '../../../services/UserService';

const ConfirmEmail: FC<User> = (user) => {
    const [mailSended, setMailSended] = useState(false);
    const [activate, setActivate] = useState(false);
    const [message, setMessage] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    useEffect(() => {
        const getCode = async () => {
            const resp = await UserService.sendCode(user.email);
            setMessage(resp.message);
        };
        if (mailSended) {
            getCode();
        }
    }, [mailSended, user.email]);

    useEffect(() => {
        const activateUser = async () => {
            const resp = await UserService.activate(
                user.email,
                confirmationCode,
            );
            setMessage(resp.message);
        };
        if (activate) {
            activateUser();
        }
    }, [activate, confirmationCode, user.email]);

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
                    <div>{message}</div>
                </>
            )}
            {message && (
                <button disabled={activate} onClick={() => setActivate(true)}>
                    Activate
                </button>
            )}
        </>
    );
};

export default ConfirmEmail;
