import { Match } from './Match';
import { User } from './User';

type Stake = {
    stakes: Stake[];
    id: number;
    matchId: number;
    homeScore: number;
    awayScore: number;
    money: number | null;
    user: User;
    match: Match;
};

export type { Stake };
