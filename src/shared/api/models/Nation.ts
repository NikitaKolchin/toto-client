import type { Competition } from './Competition';

type Nation = {
    id: string;
    value: string;
    description: string;
    competitions: Array<Competition>;
};

export type { Nation };
