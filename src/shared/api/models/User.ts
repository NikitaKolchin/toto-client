import type { Competition } from './Competition';
import type { Role } from './Role';

type User = {
    id: string;
    email: string;
    isActivated: boolean;
    alias: string;
    firstName: string;
    secondName: string;
    roles: Array<Role>;
    competitions: Array<Competition>;
};

export type { User };
