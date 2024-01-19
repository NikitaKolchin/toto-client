import $api from '../../../shared/lib/http';
import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '../model/types/response/AuthResponse';
import { RegDto } from '../model/types/dto/RegDto';
import { AuthDto } from '../model/types/dto/AuthDto';

export default class AuthService {
    static async login({
        email,
        password,
    }: AuthDto): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', { email, password });
    }

    static async registration({
        email,
        password,
        alias,
        firstName,
        secondName,
    }: RegDto): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration', {
            email,
            password,
            alias,
            firstName,
            secondName,
        });
    }

    static async logout(): Promise<AxiosResponse<boolean>> {
        return $api.post('/auth/logout');
    }

    static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
        return await axios.get<AuthResponse>(`/api/auth/refresh`, {
            withCredentials: true,
        });
        // return $api.get(`/auth/refresh`)
    }
}
