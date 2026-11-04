import { useSearchParams } from "react-router-dom";

/** The competition scope is part of the URL, so separate browser tabs stay independent. */
export const useCompetitionId = (): number | undefined => {
	const [searchParams] = useSearchParams();
	const value = searchParams.get("competitionId");
	const competitionId = value === null ? Number.NaN : Number(value);

	return Number.isSafeInteger(competitionId) && competitionId > 0
		? competitionId
		: undefined;
};
