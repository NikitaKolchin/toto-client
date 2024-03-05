import type { Competition } from './Competition';

type Match = {
    id: string;
    value: string;
    description: string;
    competition: Competition;
};

export type { Match };
