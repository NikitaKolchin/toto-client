export type { Competition } from './model/types/Competition';
export {
    useGetAllCompetitionsQuery,
    useGetCompetitionByIdQuery,
    useUpdateCompetitionByIdMutation,
    useAddCompetitionMutation,
    competitionsApi,
} from './services/queriesForCompetitions/queriesForCompetitions';
