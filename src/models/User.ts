import { Competition } from './Competition';
import { Role } from './Role';

export interface User {
    id: string;
    email: string;
    isActivated: boolean;
    isAllowed: boolean;
    alias: string;
    firstName: string;
    secondName: string;
    roles: Array<Role>;
    competition: Competition;
}
