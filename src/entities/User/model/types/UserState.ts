import { User } from './User';

interface UserState extends User {
    password: string;
    newPassword: string;
    confirmPassword: string;
    activationCodeSending: boolean;
    activationCodeSended: boolean;
    mailSending: boolean;
    mailSended: boolean;
    message: string;
    activationCode: string;
    activationCompleted: boolean;
    severity: 'success' | 'info' | 'warning' | 'error';
}

export type { UserState };
