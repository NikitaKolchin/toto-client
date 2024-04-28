import type { Competition } from './Competition';
import { Nation } from './Nation';

type Match = {
    id: number;
    matchNo: number;
    home: Nation;
    enable: boolean;
    visibility: boolean;
    homeScore: number | null;
    away: Nation;
    awayScore: number | null;
    coefficient: number;
    competition: Competition;
    date: string;
    homeId: number;
    awayId: number;
    competitionId: Competition['id'];
    prize: number | null;
    jackpot: number | null;
};

export type { Match };
