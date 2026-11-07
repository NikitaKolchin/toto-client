import type { Competition } from "./Competition";
import type { Team } from "./Team";

type Match = {
	id: number;
	matchNo: number;
	home: Team;
	enable: boolean;
	visibility: boolean;
	homeScore: number | null;
	away: Team;
	awayScore: number | null;
	coefficient: number;
	competition: Competition;
	date: string;
	homeId: number;
	awayId: number;
	competitionId: Competition["id"];
	prize: number | null;
	jackpot: number | null;
};

export type { Match };
