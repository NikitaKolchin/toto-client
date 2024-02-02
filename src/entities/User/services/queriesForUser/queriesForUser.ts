import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'shared/api/rtkApi';
import { UserState } from '../../model/types/UserState';
import { MessageResponse } from '../../model/types/response/MessageResponse';
export const usersApi = createApi({
    reducerPath: 'UsersApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<UserState[], void>({
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
        toggleAllow: builder.mutation<UserState, UserState['id']>({
            query: (id) => `/users/toggleAllow/${id}`,
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        sendCode: builder.mutation<MessageResponse, UserState['email']>({
            query: (email) => ({
                method: 'post',
                url: `/users/sendCode`,
                body: { email },
            }),
        }),
        activateUser: builder.mutation<
            MessageResponse,
            Pick<UserState, 'email' | 'activationCode'>
        >({
            query: ({ email, activationCode }) => ({
                method: 'post',
                url: `/users/activate`,
                body: { email, activationCode },
            }),
        }),
        changePasswordAlien: builder.mutation<
            MessageResponse,
            Pick<UserState, 'email' | 'newPassword' | 'activationCode'>
        >({
            query: ({ email, newPassword, activationCode }) => ({
                method: 'post',
                url: `/users/changePasswordAlien`,
                body: { email, password: newPassword, activationCode },
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
