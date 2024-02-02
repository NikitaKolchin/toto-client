import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { usersApi } from '../../services/queriesForUser/queriesForUser';
import { authApi } from '../../services/queriesForAuth/queriesForAuth';
import { UserState } from '../types/UserState';

const initialState: UserState = {
    id: '',
    email: '',
    isAuth: false,
    isActivated: false,
    isAllowed: false,
    alias: '',
    firstName: '',
    secondName: '',
    roles: [],
    password: '',
    newPassword: '',
    confirmPassword: '',
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
                    state.isAuth = payload.isAuth;
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
