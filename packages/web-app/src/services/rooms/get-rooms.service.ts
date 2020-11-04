import { request } from '../../helpers/request.helper';
import { API_ENDPOINTS_CONFIG } from '../../config/api';
import { GetRoomsApiResponse } from '../../models/room.model';
import { ApiResponse } from '../../models/service-response.model';

export const getRoomsService = async (): Promise<ApiResponse<GetRoomsApiResponse> | undefined> => {
    try {
        const { data, status } = await request.get(API_ENDPOINTS_CONFIG.ROOMS_ROUTES.ROOMS);
        return { data, status };
    } catch (e) {
        console.error(e);
        return undefined;
    }
};
