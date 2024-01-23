import { TokensResponse } from 'shared/types/TokensResponse';
import { User } from '../User';

export interface AuthResponse extends TokensResponse {
    user: User;
    isAuth: boolean;
}
