import { ActivateDto } from './ActivateDto';

interface ChangePasswordDto extends ActivateDto {
    password: string;
}

export type { ChangePasswordDto };
