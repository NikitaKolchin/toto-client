import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'shared/api';
import { MessageResponse } from 'shared/api';
import { User } from 'shared/api';
import { ActivateDto } from 'shared/api';
import { ChangePasswordDto } from 'shared/api';
import { SendCodeDto } from 'shared/api';
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
        updateUser: builder.mutation<User, Partial<User>>({
            query: (user) => ({
                url: `users/${user.id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        deleteUser: builder.mutation<void, User['id']>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
        sendCode: builder.mutation<MessageResponse, SendCodeDto>({
            query: ({ email }) => ({
                method: 'post',
                url: `/users/sendCode`,
                body: { email },
            }),
        }),
        activateUser: builder.mutation<MessageResponse, ActivateDto>({
            query: ({ email, activationCode }) => ({
                method: 'post',
                url: `/users/activate`,
                body: { email, activationCode },
            }),
        }),
        changePasswordAlien: builder.mutation<
            MessageResponse,
            ChangePasswordDto
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
    useGetAllUsersQuery,
    useActivateUserMutation,
    useSendCodeMutation,
    useChangePasswordAlienMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi;
