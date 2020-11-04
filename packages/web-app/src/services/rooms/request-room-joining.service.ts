import { request } from '../../helpers/request.helper';
import { API_ENDPOINTS_CONFIG } from '../../config/api';
import { GetRoomsApiResponse } from '../../models/room.model';
import { ApiResponse } from '../../models/service-response.model';

export const requestJoiningRoomService = async (roomId: string, userId: string): Promise<ApiResponse<GetRoomsApiResponse> | undefined> => {
    const url = `${API_ENDPOINTS_CONFIG.ROOMS_ROUTES.ROOMS}/${roomId}`;
    try {
        const { data, status } = await request.patch(url, { userId });
        return { data, status };
    } catch (e) {
        console.error(e);
        return undefined;
    }
};
