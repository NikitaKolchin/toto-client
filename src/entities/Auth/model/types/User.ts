import type { Competition } from '../../../Competition';
import { Role } from './Role';

interface User {
    id: string;
    email: string;
    isActivated: boolean;
    isAllowed: boolean;
    alias: string;
    firstName: string;
    secondName: string;
    roles: Array<Role>;
    competition: Competition;
    confirmationCode: string;
    password: string;
}

export type { User };
