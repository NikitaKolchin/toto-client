import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AuthService from "../services/AuthService";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import axios, { AxiosResponse } from 'axios';
import {IUser} from "../models/IUser";
type DataState = {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
};

const setError = (state: DataState, action: PayloadAction<any>) => {
    state.isLoading = false;
    state.isAuth = false;
    state.error = action.payload;
};




export const login = createAsyncThunk<
    AuthResponse,
    {email : string, password: string},
    { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {

    const response = await AuthService.login(email, password);
    localStorage.setItem('token', response.data.accessToken);

    if (response.status !== 200) {
        return rejectWithValue('Server Error!');
    }
    return response.data;
});


const initialState: DataState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, setError)
    },
});

export default authSlice.reducer;
