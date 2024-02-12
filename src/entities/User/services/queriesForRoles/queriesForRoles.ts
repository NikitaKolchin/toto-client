import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'shared/api/rtkApi';
import { Role } from '../../model/types/Role';
export const rolesApi = createApi({
    reducerPath: 'RolesApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Roles'],
    endpoints: (builder) => ({
        getAllRoles: builder.query<Role[], void>({
            query: () => `roles`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: 'Roles', id }) as const,
                          ),
                          { type: 'Roles', id: 'LIST' },
                      ]
                    : [{ type: 'Roles', id: 'LIST' }],
        }),
    }),
});

export const { useGetAllRolesQuery } = rolesApi;
