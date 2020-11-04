import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';

export enum Type {
    GET_ROOMS = 'GET_ROOMS',
    GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS',
    GET_ROOMS_ERROR = 'GET_ROOMS_ERROR',
    JOIN_ROOM = 'JOIN_ROOM',
    JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS',
    JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR',
    CREATE_ROOM = 'CREATE_ROOM',
    CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS',
    CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR'
}

export const getRooms = createAction(Type.GET_ROOMS);
export const getRoomsSuccess = createAction(Type.GET_ROOMS_SUCCESS);
export const getRoomsError = createAction(Type.GET_ROOMS_ERROR);

export const joinRoom = createAction(Type.JOIN_ROOM);
export const joinRoomSuccess = createAction(Type.JOIN_ROOM_SUCCESS);
export const joinRoomError = createAction(Type.JOIN_ROOM_ERROR);

export const createRoom = createAction(Type.CREATE_ROOM);
export const createRoomSuccess = createAction(Type.CREATE_ROOM_SUCCESS);
export const createRoomError = createAction(Type.CREATE_ROOM_ERROR);

const actions = {
    getRooms,
    getRoomsError,
    getRoomsSuccess,

    joinRoom,
    joinRoomError,
    joinRoomSuccess,

    createRoom,
    createRoomError,
    createRoomSuccess,
};

export const useRoomActions = (dispatch: Dispatch): typeof actions => {
    return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]);
};
