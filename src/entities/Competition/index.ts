export type { Competition } from '../../shared/api/models/Competition';
export {
    useGetAllCompetitionsQuery,
    useGetCompetitionByIdQuery,
    useUpdateCompetitionByIdMutation,
    useAddCompetitionMutation,
    useDeleteCompetitionByIdMutation,
    competitionsApi,
} from './services/queriesForCompetitions/queriesForCompetitions';
export { reducer as competition } from './model/slice/competitionSlice';
