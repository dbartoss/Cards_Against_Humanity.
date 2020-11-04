export const API_ENDPOINTS_CONFIG = {
    AUTH_ROUTES: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
    },
    CARDS_ROUTES: {
        DRAW_WHITE: '/cards/draw-white/:cardsAmount',
        DRAW_BLACK: '/cards/draw-black',
    },
    ROOMS_ROUTES: {
        ROOMS: '/rooms',
        ROOM_BY_ID: '/rooms/:roomId',
        UPDATE_CHOICE: '/rooms/updateChoice/:roomId',
        FINISH_ROUND: '/rooms/finishRound/:roomId',
        START_GAME: '/rooms/startGame/:roomId/:userId'
    },
    USERS_ROUTES: {
        USERS: '/users',
        USERS_BY_ID: '/users/:userId'
    },
};
