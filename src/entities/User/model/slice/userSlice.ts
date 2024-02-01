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
    severity: 'info',
    activationCode: '',
    activationCompleted: false,
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
        setActivationCode: (state, action: PayloadAction<string>) => {
            state.activationCode = action.payload;
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
            .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
                state.severity = 'error';
            })
            .addMatcher(
                authApi.endpoints.registration.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload.user;
                },
            )
            .addMatcher(
                authApi.endpoints.registration.matchRejected,
                (state) => {
                    state.severity = 'error';
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
                state.accessToken = '';
                state.refreshToken = '';
                state.activationCodeSending = false;
                state.activationCodeSended = false;
                state.mailSending = false;
                state.mailSended = false;
                state.message = '';
                state.severity = 'info';
                state.activationCode = '';
                state.activationCompleted = false;
            })
            .addMatcher(
                usersApi.endpoints.sendCode.matchFulfilled,
                (state, { payload }) => {
                    state.mailSended = true;
                    state.message = payload.message;
                    state.severity = 'info';
                },
            )
            .addMatcher(
                usersApi.endpoints.activateUser.matchFulfilled,
                (state, { payload }) => {
                    state.user.isActivated = true;
                    state.mailSended = false;
                    state.mailSending = false;
                    state.activationCodeSended = false;
                    state.activationCodeSending = false;
                    state.activationCode = '';
                    state.message = payload.message;
                    state.activationCompleted = true;
                    state.severity = 'success';
                },
            )
            .addMatcher(
                usersApi.endpoints.activateUser.matchRejected,
                (state) => {
                    state.mailSended = false;
                    state.mailSending = false;
                    state.activationCodeSended = false;
                    state.activationCodeSending = false;
                    state.activationCode = '';
                    state.message = 'Активация провалена';
                    state.severity = 'error';
                },
            );
    },
});
export const { reducer } = userSlice;
export const {
    setMailSended,
    setMailSending,
    setActivationCodeSended,
    setActivationCode,
    setActivationCodeSending,
} = userSlice.actions;
