import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from 'shared/api/rtkApi';
import { UserState } from '../../model/types/UserState';
import { TokensResponse } from 'shared/types/TokensResponse';
import { LoginDto } from '../../model/types/dto/LoginDto';
import { RegistrationDto } from '../../model/types/dto/RegistrationDto';
interface AuthResponse extends TokensResponse {
    user: UserState;
}
export const authApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        login: builder.mutation<UserState, LoginDto>({
            query: ({ email, password }) => ({
                method: 'post',
                url: `/auth/login`,
                body: { email, password },
            }),
            transformResponse: (response: AuthResponse) => {
                localStorage.setItem('token', response.accessToken);
                return {
                    ...response.user,
                    isAuth: true,
                };
            },
        }),
        registration: builder.mutation<UserState, RegistrationDto>({
            query: ({ email, password, alias, firstName, secondName }) => ({
                method: 'post',
                url: `/auth/registration`,
                body: { email, password, alias, firstName, secondName },
            }),
            transformResponse: (response: AuthResponse) => {
                localStorage.setItem('token', response.accessToken);
                return {
                    ...response.user,
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
        checkAuth: builder.mutation<UserState, void>({
            query: () => `/auth/refresh`,
            transformResponse: (response: AuthResponse) => {
                localStorage.setItem('token', response.accessToken);
                return {
                    ...response.user,
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
