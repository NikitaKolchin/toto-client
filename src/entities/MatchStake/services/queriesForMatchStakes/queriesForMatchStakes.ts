import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'shared/api/rtkApi/baseQueryWithReauth/baseQueryWithReauth';
import type { MatchStakeApi, Stake } from 'shared/api';
import { MatchStake } from '../../models/MatchStake';
export const stakesApi = createApi({
    reducerPath: 'stakesApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['MatchStakes'],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getMatchStakeById: builder.query<MatchStakeApi, string>({
            query: (id) => `stakes/${id}`,
        }),
        getAllMatchStakes: builder.query<MatchStake[], void>({
            query: () => `stakes`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) =>
                                  ({ type: 'MatchStakes', id }) as const,
                          ),
                          { type: 'MatchStakes', id: 'LIST' },
                      ]
                    : [{ type: 'MatchStakes', id: 'LIST' }],
            transformResponse: (response: MatchStakeApi[]) =>
                response.map((matchStake) => {
                    const stake = matchStake.stakes?.length
                        ? matchStake.stakes[0]
                        : {
                              id: null,
                              matchId: null,
                              homeScore: null,
                              awayScore: null,
                              money: null,
                          };
                    delete matchStake.stakes;
                    const newMatchStake: MatchStake = {
                        ...matchStake,
                        stake,
                    };
                    return newMatchStake;
                }),
        }),
        updateMatchStakeById: builder.mutation<
            MatchStakeApi,
            Partial<MatchStakeApi> & Pick<MatchStakeApi, 'id'>
        >({
            query: ({ id, ...patch }) => ({
                url: `stakes/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'MatchStakes', id },
            ],
        }),
        addMatchStake: builder.mutation<MatchStakeApi, Partial<MatchStakeApi>>({
            query(body) {
                return {
                    url: `stakes`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'MatchStakes', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetMatchStakeByIdQuery,
    useGetAllMatchStakesQuery,
    useUpdateMatchStakeByIdMutation,
    useAddMatchStakeMutation,
} = stakesApi;
