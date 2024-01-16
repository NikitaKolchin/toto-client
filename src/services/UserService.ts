import $api from '../utils/http';
import { AxiosError, AxiosResponse } from 'axios';
import { User } from '../models/User';
import { MessageResponse } from '../models/response/MessageResponse';

export default class UserService {
    static async sendCode(email: User['email']): Promise<MessageResponse> {
        let response: MessageResponse;
        try {
            response = (
                await $api.get<MessageResponse>(`/users/sendCode/${email}`)
            ).data;
        } catch (e) {
            if ((e as AxiosError<MessageResponse>).response) {
                response = (e as AxiosError<MessageResponse>).response!.data;
            } else {
                response = e as Error;
            }
        }
        return response;
    }

    static async activate(
        email: User['email'],
        confirmationCode: string,
    ): Promise<MessageResponse> {
        let response: MessageResponse;
        try {
            response = (
                await $api.get<MessageResponse>(
                    `/users/activate/${email}/${confirmationCode}`,
                )
            ).data;
        } catch (e) {
            if ((e as AxiosError<MessageResponse>).response) {
                response = (e as AxiosError<MessageResponse>).response!.data;
            } else {
                response = e as Error;
            }
        }
        return response;
    }

    static async toggleAllow(id: User['id']): Promise<Partial<User & Error>> {
        let response: Partial<User & Error>;
        try {
            response = (await $api.get<User>(`/users/toggleAllow/${id}`)).data;
        } catch (e) {
            response = e as Error;
        }
        return response;
    }

    static async changePasswordAlien(
        email: User['email'],
        password: string,
        confirmationCode: string,
    ): Promise<MessageResponse> {
        let response: MessageResponse;

        try {
            response = (
                await $api.get<MessageResponse>(
                    `/users/changePasswordAlien/${email}/${password}/${confirmationCode}`,
                )
            ).data; //post!!!!
        } catch (e) {
            if ((e as AxiosError<MessageResponse>).response) {
                response = (e as AxiosError<MessageResponse>).response!.data;
            } else {
                response = e as Error;
            }
        }
        return response;
    }

    static fetchUsers(): Promise<AxiosResponse<User[]>> {
        return $api.get<User[]>('/users');
    }
}
