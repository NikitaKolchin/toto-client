import { AlertColor } from '@mui/material';
import { User } from './User';

interface UserState extends User {
    activationCodeSending: boolean;
    activationCodeSended: boolean;
    mailSending: boolean;
    mailSended: boolean;
    message: string;
    activationCode: string;
    activationCompleted: boolean;
    severity: AlertColor;
}

export type { UserState };
