import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from 'shared/api';
import { UserState } from '../../model/types/UserState';
import { TokensResponse } from 'shared/api';
import { LoginDto } from 'shared/api';
import { RegistrationDto } from 'shared/api';
import { User } from 'shared/api';
import { initialState } from '../../model/slice/userSlice';
interface AuthResponse extends TokensResponse {
    user: User;
}

const isAllowed = (response: AuthResponse) =>
    response.user.roles.some((role) => role.value === 'USER');
export const authApi = createApi({
    reducerPath: 'AuthApi',
    refetchOnMountOrArgChange: true,
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
                    ...initialState,
                    ...response.user,
                    isAuth: true,
                    isAllowed: isAllowed(response),
                };
            },
        }),
        registration: builder.mutation<User, RegistrationDto>({
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
                    ...initialState,
                    ...response.user,
                    isAuth: true,
                    isAllowed: isAllowed(response),
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
