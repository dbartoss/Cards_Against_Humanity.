import { AppThunk } from '../../models/app-thunk.model';
import { createNewRoomService } from '../../services/rooms/create-new-room.service';
import { getRoomsService } from '../../services/rooms/get-rooms.service';
import { requestJoiningRoomService } from '../../services/rooms/request-room-joining.service';
import {
    createRoom,
    createRoomError, createRoomSuccess,
    getRooms,
    getRoomsError,
    getRoomsSuccess,
    joinRoom,
    joinRoomError,
    joinRoomSuccess,
} from '../actions/rooms.actions';


export const fetchRooms = (): AppThunk => async dispatch => {
    try {
        await dispatch(getRooms());
        const res = await getRoomsService();

        if (!res) {
            return dispatch(getRoomsError());
        }

        await dispatch(getRoomsSuccess({ rooms: res.data }));
    } catch (error) {
        dispatch(getRoomsError());
    }
};

export const joinToRoom = (roomId: string, userId: string | null, redirectTo: Function): AppThunk => async dispatch => {
    try {
        if (!userId) {
            console.error(userId);
            return;
        }

        await dispatch(joinRoom());
        const res = await requestJoiningRoomService(roomId, userId);

        if (!res) {
            return dispatch(joinRoomError());
        }

        await dispatch(joinRoomSuccess());
        await dispatch(fetchRooms());

        redirectTo(`/dashboard/rooms/${roomId}`);
    } catch (error) {
        dispatch(joinRoomError());
    }
};

export const createNewRoom = (roomName: string, userId: string | null, redirectTo: Function): AppThunk => async dispatch => {
  try {
      if (!userId) {
          console.error(userId);
          return;
      }

      await dispatch(createRoom());

      const res = await createNewRoomService({ name: roomName, userId });

      if (!res?.data) {
          return dispatch(createRoomError());
      }

      const { id } = res.data;

      await dispatch(createRoomSuccess());
      redirectTo(`./${id}`);
  }  catch (error) {
      dispatch(createRoomError())
  }
};
