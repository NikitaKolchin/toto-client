import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Competition } from '../../../entities/Competition';
export const competitionsApi = createApi({
    reducerPath: 'competitionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: './api/' }),
    endpoints: (builder) => ({
        getCompetitionById: builder.query<Competition, number>({
            query: (id) => `competitions/${id}`,
        }),
    }),
});

export const { useGetCompetitionByIdQuery } = competitionsApi;
