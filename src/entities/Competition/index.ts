export type { Competition } from "../../shared/api/models/Competition";
export { useCompetitionId } from "./model/hooks/useCompetitionId";
export { reducer as competition } from "./model/slice/competitionSlice";
export {
	competitionsApi,
	useAddCompetitionMutation,
	useDeleteCompetitionByIdMutation,
	useGetAllCompetitionsQuery,
	useGetCompetitionByIdQuery,
	useGetMyParticipationQuery,
	useGetSelectedCompetitionIdQuery,
	useSelectCompetitionMutation,
	useUpdateCompetitionByIdMutation,
} from "./services/queriesForCompetitions/queriesForCompetitions";
