import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { usersApi } from '../../services/queriesForUser/queriesForUser';
import { authApi } from '../../services/queriesForAuth/queriesForAuth';

import { UserState } from '../types/UserState';

export const initialState: UserState = {
    id: '',
    email: '',
    isActivated: false,
    alias: '',
    firstName: '',
    secondName: '',
    roles: [],
    isAllowed: false,
    isAuth: false,
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
        setMessage: (
            state,
            action: PayloadAction<{
                message: string;
                severity: UserState['severity'];
            }>,
        ) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.id = payload.id;
                    state.email = payload.email;
                    state.isAuth = payload.isAuth;
                    state.isActivated = payload.isActivated;
                    state.isAllowed = payload.isAllowed;
                    state.alias = payload.alias;
                    state.firstName = payload.firstName;
                    state.secondName = payload.secondName;
                    state.roles = payload.roles;
                    state.email = payload.email;
                },
            )
            .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
                state.severity = 'error';
            })
            .addMatcher(
                authApi.endpoints.registration.matchFulfilled,
                (state, { payload }) => {
                    state.email = payload.email;
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
                    state.id = payload.id;
                    state.email = payload.email;
                    state.isAuth = payload.isAuth;
                    state.isActivated = payload.isActivated;
                    state.isAllowed = payload.isAllowed;
                    state.alias = payload.alias;
                    state.firstName = payload.firstName;
                    state.secondName = payload.secondName;
                    state.roles = payload.roles;
                    state.email = payload.email;
                },
            )
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
                state.id = '';
                state.email = '';
                state.isAuth = false;
                state.isActivated = false;
                state.isAllowed = false;
                state.alias = '';
                state.firstName = '';
                state.secondName = '';
                state.roles = [];
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
                    state.isActivated = true;
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
                    state.message = 'Неверный код активации';
                    state.severity = 'error';
                },
            )
            .addMatcher(
                usersApi.endpoints.changePasswordAlien.matchRejected,
                (state) => {
                    // state.mailSended = false;
                    // state.activationCodeSended = false;
                    // state.activationCode = '';
                    state.message = 'Неверный код активации';
                    state.severity = 'error';
                },
            )
            .addMatcher(
                usersApi.endpoints.changePasswordAlien.matchFulfilled,
                (state) => {
                    // state.mailSended = false;
                    // state.activationCodeSended = false;
                    // state.activationCode = '';
                    state.message = 'Пароль изменён';
                    state.severity = 'success';
                },
            );
    },
});
export const { reducer } = userSlice;
export const {
    setMailSended,
    setMailSending,
    setMessage,
    setActivationCodeSended,
    setActivationCode,
    setActivationCodeSending,
} = userSlice.actions;
