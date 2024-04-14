import { createApi } from '@reduxjs/toolkit/query/react';
import { Match, baseQueryWithReauth } from 'shared/api';
export const resultApi = createApi({
    reducerPath: 'UsersApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users'],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getResult: builder.query<Match[], void>({
            query: () => `users/result`,
        }),
    }),
});

export const { useGetResultQuery } = resultApi;
