import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from 'shared/api/rtkApi';
import { AuthResponse } from '../../model/types/response/AuthResponse';
import { User } from '../../model/types/User';
export const authApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, Pick<User, 'email' | 'password'>>(
            {
                query: ({ email, password }) => ({
                    method: 'post',
                    url: `/auth/login`,
                    body: { email, password },
                }),
                transformResponse: (response: AuthResponse) => {
                    localStorage.setItem('token', response.accessToken);
                    return {
                        ...response,
                        isAuth: true,
                    };
                },
            },
        ),
        registration: builder.mutation<
            AuthResponse,
            Pick<
                User,
                'email' | 'password' | 'alias' | 'firstName' | 'secondName'
            >
        >({
            query: ({ email, password, alias, firstName, secondName }) => ({
                method: 'post',
                url: `/auth/registration`,
                body: { email, password, alias, firstName, secondName },
            }),
            transformResponse: (response: AuthResponse) => {
                localStorage.setItem('token', response.accessToken);
                return {
                    ...response,
                    isAuth: true,
                };
            },
        }),
        logout: builder.mutation<boolean, void>({
            query: () => ({
                method: 'post',
                url: `/auth/logout`,
            }),
            transformResponse: (response: boolean) => {
                localStorage.removeItem('token');
                return response;
            },
        }),
        checkAuth: builder.mutation<AuthResponse, void>({
            query: () => `/auth/refresh`,
            transformResponse: (response: AuthResponse) => {
                localStorage.setItem('token', response.accessToken);
                return {
                    ...response,
                    isAuth: true,
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useLogoutMutation,
    useCheckAuthMutation,
} = authApi;
