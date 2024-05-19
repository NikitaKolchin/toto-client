import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'shared/api/rtkApi/baseQueryWithReauth/baseQueryWithReauth';
import type { Match } from 'shared/api';
import { ResultHeader } from 'shared/api';
export const matchesApi = createApi({
    reducerPath: 'matchesApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Matches'],
    endpoints: (builder) => ({
        getMatchById: builder.query<Match, string>({
            query: (id) => `matches/${id}`,
        }),
        getAllMatches: builder.query<Match[], void>({
            query: () => `matches`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: 'Matches', id }) as const,
                          ),
                          { type: 'Matches', id: 'LIST' },
                      ]
                    : [{ type: 'Matches', id: 'LIST' }],
        }),
        getAllMatchesForResult: builder.query<ResultHeader[], void>({
            query: () => `matches/resultHeaders`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: 'Matches', id }) as const,
                          ),
                          { type: 'Matches', id: 'LIST' },
                      ]
                    : [{ type: 'Matches', id: 'LIST' }],
        }),
        updateMatchById: builder.mutation<
            Match,
            Partial<Match> & Pick<Match, 'id'>
        >({
            query: ({ id, ...patch }) => ({
                url: `matches/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Matches', id },
            ],
        }),
        addMatch: builder.mutation<Match, Partial<Match>>({
            query(body) {
                return {
                    url: `matches`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Matches', id: 'LIST' }],
        }),
        deleteMatch: builder.mutation<void, Match['id']>({
            query: (id) => ({
                url: `matches/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Matches', id }],
        }),
        uploadMatches: builder.mutation<{ done: boolean }, void>({
            query() {
                return {
                    url: `matches/upload`,
                    method: 'POST',
                };
            },
            invalidatesTags: [{ type: 'Matches', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetMatchByIdQuery,
    useGetAllMatchesQuery,
    useGetAllMatchesForResultQuery,
    useUpdateMatchByIdMutation,
    useAddMatchMutation,
    useDeleteMatchMutation,
    useUploadMatchesMutation,
} = matchesApi;
