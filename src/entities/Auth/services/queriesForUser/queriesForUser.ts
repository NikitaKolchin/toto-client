import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from '../../model/types/User';
import { baseQueryWithReauth } from '../../../../shared/api/rtkApi/baseQueryWithReauth';
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
        sendCode: builder.query<MessageResponse, User['email']>({
            query: (email) => `/users/sendCode/${email}`,
        }),
        activate: builder.query<
            MessageResponse,
            { email: User['email']; confirmationCode: string }
        >({
            query: ({ email, confirmationCode }) =>
                `/users/activate/${email}/${confirmationCode}`,
        }),
    }),
});

export const {
    useLazyGetAllUsersQuery,
    useActivateQuery,
    useSendCodeQuery,
    useToggleAllowMutation,
} = usersApi;
