import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'shared/api/rtkApi/baseQueryWithReauth/baseQueryWithReauth';
import type { Match } from 'shared/api';
import dayjs from 'dayjs';
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
            transformResponse: (response: Match[]) => {
                console.log(response);
                return response.map((match) => ({
                    ...match,
                    date: dayjs(match.date)?.format('MM/DD/YYYY'),
                }));
            },
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
    }),
});

export const {
    useGetMatchByIdQuery,
    useGetAllMatchesQuery,
    useUpdateMatchByIdMutation,
    useAddMatchMutation,
} = matchesApi;
