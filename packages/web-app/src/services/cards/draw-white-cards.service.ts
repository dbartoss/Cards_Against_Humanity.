import { request } from '../../helpers/request.helper';
import { API_ENDPOINTS_CONFIG } from '../../config/api';
import { CardModel } from '../../models/card.model';
import { ApiResponse } from '../../models/service-response.model';

export const drawWhiteCardsService = async (cardsAmount: string): Promise<ApiResponse<CardModel[]> | undefined> => {
    try {
        const url: string = API_ENDPOINTS_CONFIG.CARDS_ROUTES.DRAW_WHITE.replace(':cardsAmount', cardsAmount);
        const { data, status } = await request.get(url);
        return { data, status };
    } catch (e) {
        console.error(e);
        return undefined;
    }
};
