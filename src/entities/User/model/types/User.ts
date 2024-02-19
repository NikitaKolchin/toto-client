import { Role } from './Role';

type User = {
    id: string;
    email: string;
    isActivated: boolean;
    alias: string;
    firstName: string;
    secondName: string;
    roles: Array<Role>;
};

export type { User };
