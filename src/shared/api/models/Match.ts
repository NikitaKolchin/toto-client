import type { Competition } from './Competition';
import { Nation } from './Nation';

type Match = {
    id: string;
    matchNo: string;
    home: Nation;
    enable: boolean;
    visibility: boolean;
    homeScore: string;
    away: Nation;
    awayScore: string;
    competition: Competition;
    date: string;
};

export type { Match };
