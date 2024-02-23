export interface Role {
    value: Roles;
    id: string;
    description: string;
}

export enum Roles {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
