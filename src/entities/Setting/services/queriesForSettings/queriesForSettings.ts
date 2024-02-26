import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'shared/api';
import type { Setting } from 'shared/api/models/Setting';
export const settingsApi = createApi({
    reducerPath: 'settingsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Settings'],
    endpoints: (builder) => ({
        getSettingById: builder.query<Setting, string>({
            query: (id) => `Settings/${id}`,
        }),
        getAllSettings: builder.query<Setting[], void>({
            query: () => `Settings`,
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                      [
                          ...result.map(
                              ({ id }) => ({ type: 'Settings', id }) as const,
                          ),
                          { type: 'Settings', id: 'LIST' },
                      ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                      [{ type: 'Settings', id: 'LIST' }],
        }),
        updateSettingById: builder.mutation<
            Setting,
            Partial<Setting> & Pick<Setting, 'id'>
        >({
            query: ({ id, ...patch }) => ({
                url: `settings/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Settings', id },
            ],
        }),
        addSetting: builder.mutation<Setting, Partial<Setting>>({
            query(body) {
                return {
                    url: `Settings`,
                    method: 'POST',
                    body,
                };
            },
            // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
            // that newly created post could show up in any lists.
            invalidatesTags: [{ type: 'Settings', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetSettingByIdQuery,
    useGetAllSettingsQuery,
    useUpdateSettingByIdMutation,
    useAddSettingMutation,
} = settingsApi;
