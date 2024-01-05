import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AuthService from "../services/AuthService";
import {AuthResponse} from "../models/response/AuthResponse";
import {User} from "../models/User";
import { AuthDto } from '../models/dto/AuthDto';
import { RegDto } from '../models/dto/RegDto';
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


export const login = createAsyncThunk<
    AuthResponse,
    AuthDto,
    { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {

    const response = await AuthService.login({email, password});
    localStorage.setItem('token', response.data.accessToken);

    if (response.status !== 200) {
        return rejectWithValue('Server Error!');
    }
    return response.data;
});

export const registration = createAsyncThunk<
    AuthResponse,
    RegDto,
    { rejectValue: string }
>('auth/registration', async ({ email, password, name }, { rejectWithValue }) => {

    const response = await AuthService.registration({ email, password, name });
    localStorage.setItem('token', response.data.accessToken);

    if (response.status !== 201) {
        return rejectWithValue('Server Error!');
    }
    return response.data;
});

export const logout = createAsyncThunk<
    boolean,
    undefined,
    { rejectValue: string }
>('auth/logout', async (_, { rejectWithValue }) => {

    const response = await AuthService.logout();
    localStorage.removeItem('token');

    if (response.status !== 200) {
        return rejectWithValue('Server Error!');
    }
    return response.data;
});


export const checkAuth = createAsyncThunk<
    AuthResponse,
    undefined,
    { rejectValue: string }
>('auth/checkAuth', async (_, { rejectWithValue }) => {

    const response = await AuthService.checkAuth();
    localStorage.setItem('token', response.data.accessToken);

    if (response.status !== 200) {
        return rejectWithValue('Server Error!');
    }
    return response.data;
});


const initialState: DataState = {
    user: {} as User,
    isAuth: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
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
            .addCase(registration.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
                state.error = null;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.user = action.payload.user;
            })
            .addCase(registration.rejected, setError)
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(checkAuth.rejected, setError)
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                state.user = {} as User;
            })
            .addCase(logout.rejected, setError)
    },
});

export default authSlice.reducer;
