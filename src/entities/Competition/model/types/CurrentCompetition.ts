import { Competition } from 'shared/api';

interface CurrentCompetition {
    id: Competition['id'] | undefined;
    value: Competition['value'] | undefined;
}

export type { CurrentCompetition };
