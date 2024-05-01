import type { Match } from './Match';

type Stat = {
    homeStakes: number;
    awayStakes: number;
    drawStakes: number;
};
type ResultHeader = Pick<
    Match,
    | 'id'
    | 'matchNo'
    | 'home'
    | 'away'
    | 'homeScore'
    | 'awayScore'
    | 'prize'
    | 'jackpot'
    | 'date'
> & { stat: Stat | null };

export type { ResultHeader };
