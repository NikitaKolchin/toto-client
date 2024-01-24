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
                    state = payload;
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
        // .addCase(AuthController.login.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = null;
        // })
        // .addCase(AuthController.login.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isAuth = true;
        //     state.user = action.payload.user;
        // })
        // .addCase(AuthController.login.rejected, setError)
        // .addCase(AuthController.registration.pending, (state) => {
        //     state.isLoading = true;
        //     state.isAuth = false;
        //     state.error = null;
        // })
        // .addCase(AuthController.registration.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isAuth = false;
        //     state.user = action.payload.user;
        // })
        // .addCase(AuthController.registration.rejected, setError)
        // .addCase(AuthController.checkAuth.pending, (state) => {
        //     state.isLoading = true;
        //     state.isAuth = false;
        //     state.error = null;
        // })
        // .addCase(AuthController.checkAuth.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isAuth = true;
        //     state.user = action.payload.user;
        // })
        // .addCase(AuthController.checkAuth.rejected, setError)
        // .addCase(AuthController.logout.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = null;
        // })
        // .addCase(AuthController.logout.fulfilled, (state) => {
        //     state.isLoading = false;
        //     state.isAuth = false;
        //     state.user = {} as User;
        // })
        // .addCase(AuthController.logout.rejected, setError);
    },
});
export const { reducer } = authSlice;
