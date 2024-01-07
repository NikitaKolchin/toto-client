import $api from '../utils/http';
import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { RegDto } from '../models/dto/RegDto';
import { AuthDto } from '../models/dto/AuthDto';

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
        name,
    }: RegDto): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration', {
            email,
            password,
            name,
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
