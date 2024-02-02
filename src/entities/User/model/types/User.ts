import { Role } from './Role';

interface User {
    id: string;
    email: string;
    isAuth: boolean;
    isActivated: boolean;
    isAllowed: boolean;
    alias: string;
    firstName: string;
    secondName: string;
    roles: Array<Role>;
}

export type { User };
