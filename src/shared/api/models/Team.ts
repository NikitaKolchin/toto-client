import type { Competition } from "./Competition";

type Team = {
	id: string;
	value: string;
	description: string;
	competitions: Array<Competition>;
};

export type { Team };
