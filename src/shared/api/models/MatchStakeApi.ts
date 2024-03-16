import { Match } from './Match';
import { Stake } from './Stake';

interface MatchStakeApi extends Match {
    stakes: Stake[] | undefined;
}

export type { MatchStakeApi };
