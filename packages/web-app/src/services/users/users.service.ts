import { request } from '../../helpers/request.helper';
import { API_ENDPOINTS_CONFIG } from '../../config/api';
import { ApiResponse } from '../../models/service-response.model';
import { UserModel } from '../../models/user.model';

export const getUsers = async (): Promise<ApiResponse<UserModel[]> | undefined> => {
    try {
        const { data, status } = await request.get(API_ENDPOINTS_CONFIG.USERS_ROUTES.USERS);
        return { data, status };
    } catch (e) {
        console.error(e);
        return undefined;
    }
};
