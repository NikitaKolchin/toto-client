import { Competition } from './Competition';

export interface Setting {
    id: number;
    contribution: number;
    direction: number;
    difference: number;
    outcome: number;
    disabled: boolean;
    competition: Competition;
}
