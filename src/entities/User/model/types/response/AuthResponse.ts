import { TokensResponse } from 'shared/types/TokensResponse';
import { User } from '../User';

export interface AuthResponse extends TokensResponse {
    user: User;
    isAuth: boolean;
    activationCodeSending: boolean;
    activationCodeSended: boolean;
    mailSending: boolean;
    mailSended: boolean;
    message: string;
    activationCode: string;
}
