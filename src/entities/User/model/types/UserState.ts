import { AlertColor } from '@mui/material';
import { User } from '../../../../shared/api/models/User';

interface UserState extends User {
    activationCodeSending: boolean;
    activationCodeSended: boolean;
    mailSending: boolean;
    mailSended: boolean;
    message: string;
    activationCode: string;
    activationCompleted: boolean;
    severity: AlertColor;
    isAuth: boolean;
    isAllowed: boolean;
}

export type { UserState };
