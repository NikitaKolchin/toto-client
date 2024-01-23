import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { TokensResponse } from '../../../types/TokensResponse';
import { baseQueryWithAuth } from '../baseQueryWithAuth/baseQueryWithAuth';

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQueryWithAuth(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQueryWithAuth(
            'auth/refresh',
            api,
            extraOptions,
        );
        if (refreshResult.data) {
            const refreshTokenResult = refreshResult.data as TokensResponse;
            localStorage.setItem('token', refreshTokenResult.accessToken);
            result = await baseQueryWithAuth(args, api, extraOptions);
        } else {
            await baseQueryWithAuth(
                {
                    method: 'post',
                    url: `/auth/logout`,
                },
                api,
                extraOptions,
            );
            localStorage.removeItem('token');
            // api.dispatch(AuthController.logout());
        }
    }
    return result;
};

export { baseQueryWithReauth };
