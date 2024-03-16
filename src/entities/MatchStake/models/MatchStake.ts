import { Match, Stake } from 'shared/api';

interface MatchStake extends Match {
    stake: Stake;
}

export type { MatchStake };
