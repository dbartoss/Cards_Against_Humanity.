import { request } from '../../helpers/request.helper';
import { API_ENDPOINTS_CONFIG } from '../../config/api';
import { LoginApiResponse, LoginForm } from '../../models/auth.model';
import { ApiResponse } from '../../models/service-response.model';

export const logInUserService = async (values: LoginForm): Promise<ApiResponse<LoginApiResponse> | undefined> => {
    try {
        const { data, status } = await request.post(API_ENDPOINTS_CONFIG.AUTH_ROUTES.LOGIN, values);
        return { data, status };
    } catch (e) {
        console.error(e);
        return undefined;
    }
};
