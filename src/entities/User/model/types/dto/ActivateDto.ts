import { SendCodeDto } from './SendCodeDto';

interface ActivateDto extends SendCodeDto {
    activationCode: string;
}

export type { ActivateDto };
