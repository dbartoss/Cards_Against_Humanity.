import { UserModel } from './user.model';

export interface LoginForm {
    username: string;
    password: string;
}

export interface LoginApiResponse {
    token: string;
    user: UserModel;
}
