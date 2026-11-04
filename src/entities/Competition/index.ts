export type { Competition } from "../../shared/api/models/Competition";
export { useCompetitionId } from "./model/hooks/useCompetitionId";
export {
	competitionsApi,
	useAddCompetitionMutation,
	useChangeCompetitionStatusMutation,
	useDeleteCompetitionByIdMutation,
	useGetAllCompetitionsQuery,
	useGetCompetitionByIdQuery,
	useGetMyParticipationQuery,
	useGetSelectedCompetitionIdQuery,
	useSelectCompetitionMutation,
	useUpdateCompetitionByIdMutation,
} from "./services/queriesForCompetitions/queriesForCompetitions";
