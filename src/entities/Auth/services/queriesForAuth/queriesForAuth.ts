import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from 'shared/api/rtkApi';
import { AuthResponse } from '../../model/types/response/AuthResponse';
import { AuthDto } from '../../model/types/dto/AuthDto';
import { RegDto } from '../../model/types/dto/RegDto';
export const authApi = createApi({
    reducerPath: 'UsersApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        login: builder.query<AuthResponse, AuthDto>({
            query: ({ email, password }) => ({
                method: 'post',
                url: `/auth/login`,
                body: { email, password },
            }),
        }),
        registration: builder.query<AuthResponse, RegDto>({
            query: ({ email, password, alias, firstName, secondName }) => ({
                method: 'post',
                url: `/auth/registration`,
                body: { email, password, alias, firstName, secondName },
            }),
        }),
        logout: builder.query<boolean, void>({
            query: () => ({
                method: 'post',
                url: `/auth/logout`,
            }),
        }),
        checkAuth: builder.query<AuthResponse, void>({
            query: () => `/api/auth/refresh`,
        }),
    }),
});

export const {
    useLazyLoginQuery,
    useLazyRegistrationQuery,
    useLazyLogoutQuery,
    useLazyCheckAuthQuery,
} = authApi;
