import type { Competition } from './Competition';
import { Nation } from './Nation';

type Match = {
    id: number;
    matchNo: number;
    home: Nation;
    enable: boolean;
    visibility: boolean;
    homeScore: number;
    away: Nation;
    awayScore: number;
    coefficient: number;
    competition: Competition;
    date: string;
    homeId: number;
    awayId: number;
};

export type { Match };
