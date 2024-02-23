export type { Competition } from '../../shared/api/models/Competition';
export {
    useGetAllCompetitionsQuery,
    useGetCompetitionByIdQuery,
    useUpdateCompetitionByIdMutation,
    useAddCompetitionMutation,
    competitionsApi,
} from './services/queriesForCompetitions/queriesForCompetitions';
