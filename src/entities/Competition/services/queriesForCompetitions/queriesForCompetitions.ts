import { createApi } from '@reduxjs/toolkit/query/react';
import { Competition } from '../..';
import { baseQueryWithReauth } from '../../../../shared/api/rtkApi/baseQueryWithReauth';
export const competitionsApi = createApi({
    reducerPath: 'competitionsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Competitions'],
    endpoints: (builder) => ({
        getCompetitionById: builder.query<Competition, string>({
            query: (id) => `competitions/${id}`,
        }),
        getAllCompetitions: builder.query<Competition[], void>({
            query: () => `competitions`,
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                      [
                          ...result.map(
                              ({ id }) =>
                                  ({ type: 'Competitions', id }) as const,
                          ),
                          { type: 'Competitions', id: 'LIST' },
                      ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                      [{ type: 'Competitions', id: 'LIST' }],
        }),
        updateCompetitionById: builder.mutation<
            Competition,
            Partial<Competition> & Pick<Competition, 'id'>
        >({
            query: ({ id, ...patch }) => ({
                url: `competitions/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Competitions', id },
            ],
        }),
        addCompetition: builder.mutation<Competition, Partial<Competition>>({
            query(body) {
                return {
                    url: `competitions`,
                    method: 'POST',
                    body,
                };
            },
            // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
            // that newly created post could show up in any lists.
            invalidatesTags: [{ type: 'Competitions', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetCompetitionByIdQuery,
    useGetAllCompetitionsQuery,
    useUpdateCompetitionByIdMutation,
    useAddCompetitionMutation,
} = competitionsApi;
