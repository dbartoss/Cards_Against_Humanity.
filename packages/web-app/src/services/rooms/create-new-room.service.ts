import { request } from '../../helpers/request.helper';
import { API_ENDPOINTS_CONFIG } from '../../config/api';
import { NewRoomDTO, RoomModel } from '../../models/room.model';
import { ApiResponse } from '../../models/service-response.model';

export const createNewRoomService = async (newRoomDTO: NewRoomDTO): Promise<ApiResponse<RoomModel> | undefined> => {
    try {
        const { data, status } = await request.post(API_ENDPOINTS_CONFIG.ROOMS_ROUTES.ROOMS, { ...newRoomDTO });
        return { data, status };
    } catch (e) {
        console.error(e);
        return undefined;
    }
};
