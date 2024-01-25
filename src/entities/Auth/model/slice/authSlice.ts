import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/queriesForAuth/queriesForAuth';
import { User } from '../types/User';
import { AuthResponse } from '../types/response/AuthResponse';

const initialState: AuthResponse = {
    user: {} as User,
    isAuth: false,
    accessToken: '',
    refreshToken: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.accessToken = payload.accessToken;
                    state.user = payload.user;
                    state.refreshToken = payload.refreshToken;
                    state.isAuth = payload.isAuth;
                },
            )
            .addMatcher(
                authApi.endpoints.registration.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload.user;
                },
            )
            .addMatcher(
                authApi.endpoints.checkAuth.matchFulfilled,
                (state, { payload }) => {
                    state.accessToken = payload.accessToken;
                    state.user = payload.user;
                    state.refreshToken = payload.refreshToken;
                    state.isAuth = payload.isAuth;
                },
            )
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
                state.user = {} as User;
                state.isAuth = false;
            });
    },
});
export const { reducer } = authSlice;
