import { createApi } from '@reduxjs/toolkit/query/react';
import { Result, baseQueryWithReauth } from 'shared/api';
export const resultApi = createApi({
    reducerPath: 'ResultApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Result'],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getResult: builder.query<Result[], void>({
            query: () => `users/result`,
        }),
    }),
});

export const { useGetResultQuery } = resultApi;
