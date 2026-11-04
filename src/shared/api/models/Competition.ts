export interface Competition {
	id: number;
	apiId?: number | null;
	value: string;
	isCurrent: boolean;
	description: string;
	code?: string;
	status?: "DRAFT" | "ACTIVE" | "FINISHED" | "ARCHIVED";
}
