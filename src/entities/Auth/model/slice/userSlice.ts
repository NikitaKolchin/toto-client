import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { usersApi } from '../../services/queriesForUser/queriesForUser';

type UserState = {
    activationCodeSending: boolean;
    activationCodeSended: boolean;
    mailSending: boolean;
    mailSended: boolean;
    message: string;
    confirmationCode: string;
};

const initialState: UserState = {
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
                usersApi.endpoints.sendCode.matchFulfilled,
                (state, { payload }) => {
                    state.mailSended = true;
                    state.message = payload.message;
                },
            )
            .addMatcher(
                usersApi.endpoints.activateUser.matchFulfilled,
                (state, { payload }) => {
                    state.mailSended = true;
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
