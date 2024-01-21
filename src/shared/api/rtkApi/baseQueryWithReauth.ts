import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { AuthController } from '../../../entities/Auth';
import { AuthResponse } from '../../../entities/Auth/model/types/response/AuthResponse';

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: async (headers) => {
        const accessToken = localStorage.getItem('token');

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return headers;
    },
    credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQueryWithAuth(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQueryWithAuth(
            'auth/refresh',
            api,
            extraOptions,
        );
        if (refreshResult.data) {
            // store the new token
            const refreshTokenResult = refreshResult.data as AuthResponse;
            localStorage.setItem('token', refreshTokenResult.accessToken);
            // retry the initial query
            result = await baseQueryWithAuth(args, api, extraOptions);
        } else {
            api.dispatch(AuthController.logout());
        }
    }
    return result;
};

export { baseQueryWithReauth };
