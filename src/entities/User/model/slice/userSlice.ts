import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { usersApi } from '../../services/queriesForUser/queriesForUser';
import { authApi } from '../../services/queriesForAuth/queriesForAuth';
import { User } from '../types/User';
import { AuthResponse } from '../types/response/AuthResponse';

const initialState: AuthResponse = {
    user: {} as User,
    isAuth: false,
    accessToken: '',
    refreshToken: '',
    activationCodeSending: false,
    activationCodeSended: false,
    mailSending: false,
    mailSended: false,
    message: '',
    confirmationCode: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMailSended: (state, action: PayloadAction<boolean>) => {
            state.mailSended = action.payload;
        },
        setMailSending: (state, action: PayloadAction<boolean>) => {
            state.mailSending = action.payload;
        },
        setActivationCodeSended: (state, action: PayloadAction<boolean>) => {
            state.activationCodeSended = action.payload;
        },
        setActivationCodeSending: (state, action: PayloadAction<boolean>) => {
            state.activationCodeSending = action.payload;
        },
        setConfirmationCode: (state, action: PayloadAction<string>) => {
            state.confirmationCode = action.payload;
        },
    },
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
            })
            .addMatcher(
                usersApi.endpoints.sendCode.matchFulfilled,
                (state, { payload }) => {
                    state.mailSended = true;
                    state.message = payload.message;
                },
            )
            .addMatcher(
                usersApi.endpoints.activateUser.matchFulfilled,
                (state, { payload }) => {
                    state.user.isActivated = true;
                    state.message = payload.message;
                },
            )
            .addMatcher(
                usersApi.endpoints.activateUser.matchRejected,
                (state) => {
                    state.mailSended = true;
                    state.message = 'Активация провалена';
                },
            );
    },
});
export const { reducer } = userSlice;
export const {
    setMailSended,
    setMailSending,
    setActivationCodeSended,
    setConfirmationCode,
    setActivationCodeSending,
} = userSlice.actions;
