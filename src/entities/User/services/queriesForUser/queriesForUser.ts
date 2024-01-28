import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'shared/api/rtkApi';
import { User } from '../../model/types/User';
import { MessageResponse } from '../../model/types/response/MessageResponse';
export const usersApi = createApi({
    reducerPath: 'UsersApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => `users`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: 'Users', id }) as const,
                          ),
                          { type: 'Users', id: 'LIST' },
                      ]
                    : [{ type: 'Users', id: 'LIST' }],
        }),
        toggleAllow: builder.mutation<User, User['id']>({
            query: (id) => `/users/toggleAllow/${id}`,
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        sendCode: builder.mutation<MessageResponse, User['email']>({
            query: (email) => ({
                method: 'post',
                url: `/users/sendCode`,
                body: { email },
            }),
        }),
        activateUser: builder.mutation<
            MessageResponse,
            Pick<User, 'email' | 'activationCode'>
        >({
            query: ({ email, activationCode }) => ({
                method: 'post',
                url: `/users/activate`,
                body: { email, activationCode },
            }),
        }),
        changePasswordAlien: builder.mutation<
            MessageResponse,
            Pick<User, 'email' | 'password' | 'activationCode'>
        >({
            query: ({ email, password, activationCode }) => ({
                method: 'post',
                url: `/users/changePasswordAlien`,
                body: { email, password, activationCode },
            }),
        }),
    }),
});

export const {
    useLazyGetAllUsersQuery,
    useActivateUserMutation,
    useSendCodeMutation,
    useChangePasswordAlienMutation,
    useToggleAllowMutation,
} = usersApi;
