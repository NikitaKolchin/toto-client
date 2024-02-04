import { useEffect, useState } from 'react';

type Props = {
    password: string;
    confirmPassword: string;
    activationCode?: string;
};
type Response = {
    enable: boolean;
    message: string;
};
const useCanSend = ({
    password,
    confirmPassword,
    activationCode,
}: Props): Response => {
    const [canSend, setCanSend] = useState<Response>({
        enable: false,
        message: '',
    });

    useEffect(() => {
        if (!password) {
            setCanSend({ enable: false, message: '' });
        } else {
            if (password !== confirmPassword) {
                setCanSend({ enable: false, message: 'Пароли не совпадают' });
            } else {
                setCanSend({
                    enable:
                        activationCode === undefined ? true : !!activationCode,
                    message: '',
                });
            }
        }
    }, [password, confirmPassword, activationCode]);

    return canSend;
};
export { useCanSend };
