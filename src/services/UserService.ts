import $api from "../utils/http";
import {AxiosResponse} from 'axios';
import {User} from "../models/User";
import { MessageResponse } from "../models/response/MessageResponse";

export default class UserService {
    static sendCode( userId : User['id']): Promise<AxiosResponse<MessageResponse>> {
        return $api.get<MessageResponse>(`/users/sendCode/${userId}`)
    }

    static activate( userId : User['id'], confirmationCode: number): Promise<AxiosResponse<MessageResponse>> {
        return $api.get<MessageResponse>(`/users/activate/${userId}/${confirmationCode}`)
    }

    static fetchUsers(): Promise<AxiosResponse<User[]>> {
        return $api.get<User[]>('/users')
    }
}

