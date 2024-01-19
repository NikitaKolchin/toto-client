import { Competition } from '../../../Competition/model/types/Competition';
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
}

export type { User };
