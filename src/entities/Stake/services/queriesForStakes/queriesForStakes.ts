import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'shared/api/rtkApi/baseQueryWithReauth/baseQueryWithReauth';
import type { Stake } from 'shared/api';
export const stakesApi = createApi({
    reducerPath: 'stakesApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Stakes'],
    endpoints: (builder) => ({
        getStakeById: builder.query<Stake, string>({
            query: (id) => `stakes/${id}`,
        }),
        getAllStakes: builder.query<Stake[], void>({
            query: () => `stakes`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: 'Stakes', id }) as const,
                          ),
                          { type: 'Stakes', id: 'LIST' },
                      ]
                    : [{ type: 'Stakes', id: 'LIST' }],
            // transformResponse: (response: Stake[]) => {
            //     console.log(response);
            //     return response.map((stake) => ({
            //         ...stake,
            //         date: dayjs(stake.date)?.format('DD/MM//YYYY'),
            //     }));
            // },
        }),
        updateStakeById: builder.mutation<
            Stake,
            Partial<Stake> & Pick<Stake, 'id'>
        >({
            query: ({ id, ...patch }) => ({
                url: `stakes/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Stakes', id },
            ],
        }),
        addStake: builder.mutation<Stake, Partial<Stake>>({
            query(body) {
                return {
                    url: `stakes`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Stakes', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetStakeByIdQuery,
    useGetAllStakesQuery,
    useUpdateStakeByIdMutation,
    useAddStakeMutation,
} = stakesApi;
