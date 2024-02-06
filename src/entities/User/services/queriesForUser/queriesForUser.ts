import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'shared/api/rtkApi';
import { MessageResponse } from 'shared/types/MessageResponse';
import { User } from '../../model/types/User';
import { ActivateDto } from '../../model/types/dto/ActivateDto';
import { ChangePasswordDto } from '../../model/types/dto/ChangePasswordDto';
import { SendCodeDto } from '../../model/types/dto/SendCodeDto';
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
            invalidatesTags: (result) => [{ type: 'Users', id: 'LIST' }],
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
    useToggleAllowMutation,
} = usersApi;
