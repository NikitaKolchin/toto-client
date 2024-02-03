import { LoginDto } from './LoginDto';

interface RegistrationDto extends LoginDto {
    alias: string;
    firstName: string;
    secondName: string;
}

export type { RegistrationDto };
