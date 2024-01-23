import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from './AuthService';
import { AuthResponse } from '../model/types/response/AuthResponse';
import { AuthDto } from '../model/types/dto/AuthDto';
import { RegDto } from '../model/types/dto/RegDto';

class AuthController {
    static login = createAsyncThunk<
        AuthResponse,
        AuthDto,
        { rejectValue: string }
    >('auth/login', async ({ email, password }, { rejectWithValue }) => {
        const response = await AuthService.login({ email, password });
        localStorage.setItem('token', response.data.accessToken);

        if (response.status !== 200) {
            return rejectWithValue('Server Error!');
        }
        return response.data;
    });

    static registration = createAsyncThunk<
        AuthResponse,
        RegDto,
        { rejectValue: string }
    >(
        'auth/registration',
        async (
            { email, password, alias, firstName, secondName },
            { rejectWithValue },
        ) => {
            const response = await AuthService.registration({
                email,
                password,
                alias,
                firstName,
                secondName,
            });
            localStorage.setItem('token', response.data.accessToken);

            if (response.status !== 201) {
                return rejectWithValue('Server Error!');
            }
            return response.data;
        },
    );

    static logout = createAsyncThunk<
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

    // static checkAuth = createAsyncThunk<
    //     AuthResponse,
    //     undefined,
    //     { rejectValue: string }
    // >('auth/checkAuth', async (_, { rejectWithValue }) => {
    //     const response = await AuthService.checkAuth();
    //     localStorage.setItem('token', response.data.accessToken);

    //     if (response.status !== 200) {
    //         return rejectWithValue('Server Error!');
    //     }
    //     return response.data;
    // });
}

export { AuthController };
