import $api from "../utils/http";
import axios, {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration', {email, password})
    }

    static async logout(): Promise<AxiosResponse<boolean>> {
        return $api.post('/auth/logout')
    }

    static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
        return await axios.get<AuthResponse>(`/api/auth/refresh`, {withCredentials: true})
        // return $api.get(`/auth/refresh`)
    }    
}

