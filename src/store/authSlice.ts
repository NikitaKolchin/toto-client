import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/User';
import AuthController from '../controllers/AuthController';
type DataState = {
    user: User;
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
};

const setError = (state: DataState, action: PayloadAction<any>) => {
    state.isLoading = false;
    state.isAuth = false;
    state.error = action.payload;
};

const initialState: DataState = {
    user: {} as User,
    isAuth: false,
    isLoading: true,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AuthController.login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(AuthController.login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(AuthController.login.rejected, setError)
            .addCase(AuthController.registration.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
                state.error = null;
            })
            .addCase(AuthController.registration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.user = action.payload.user;
            })
            .addCase(AuthController.registration.rejected, setError)
            .addCase(AuthController.checkAuth.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
                state.error = null;
            })
            .addCase(AuthController.checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(AuthController.checkAuth.rejected, setError)
            .addCase(AuthController.logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(AuthController.logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                state.user = {} as User;
            })
            .addCase(AuthController.logout.rejected, setError);
    },
});

export default authSlice.reducer;
