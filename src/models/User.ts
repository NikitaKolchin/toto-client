export interface User {
    id: string;
    email: string;
    isActivated: boolean;
    isAllowed: boolean;
    alias: string;
    firstName: string;
    secondName: string;
    roles: Array<{ value: string }>;
    competition: { value: string };
}
