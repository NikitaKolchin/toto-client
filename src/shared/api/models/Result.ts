type Result = {
    alias: string;
    userPrize: number;
    pointsSum: number;
    [key: number]: {
        stake: string;
        money: number | null;
        points: number | null;
        color: 'gold' | 'silver' | 'chocolate' | null;
    };
};
export type { Result };
