import { request } from '../../helpers/request.helper';
import { API_ENDPOINTS_CONFIG } from '../../config/api';
import { RoomModel } from '../../models/room.model';
import { ApiResponse } from '../../models/service-response.model';

export const getRoomByIdService = async (roomId: string): Promise<ApiResponse<RoomModel> | undefined> => {
    try {
        const url: string = `${API_ENDPOINTS_CONFIG.ROOMS_ROUTES.ROOMS}/${roomId}`;
        const { data, status } = await request.get(url);
        return { data, status };
    } catch (e) {
        console.error(e);
        return undefined;
    }
};
