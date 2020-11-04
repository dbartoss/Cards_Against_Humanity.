import { request } from '../../helpers/request.helper';
import { API_ENDPOINTS_CONFIG } from '../../config/api';
import { RoomModel } from '../../models/room.model';
import { ApiResponse } from '../../models/service-response.model';

export const allowToStartGameService = async (roomId: string, userId: string | null): Promise<ApiResponse<RoomModel> | undefined> => {
    try {
        if (!roomId || !userId) {
            new Error('RoomId and UserId cannot be nullish');
            return;
        }

        const url: string = API_ENDPOINTS_CONFIG.ROOMS_ROUTES.START_GAME
            .replace(':roomId', roomId)
            .replace(':userId', userId);

        const { data, status } = await request.post(url, {});
        return { data, status };
    } catch (e) {
        console.error(e);
        return undefined;
    }
};
