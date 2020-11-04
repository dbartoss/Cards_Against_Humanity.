import { handleActions } from 'redux-actions';
import { RoomModel } from '../../models/room.model';
import { Type } from '../actions/rooms.actions';

export interface RoomsState {
    rooms: RoomModel[];
}

const initialState: RoomsState = {
    rooms: [],
};

export const roomsReducer = handleActions<RoomsState, RoomsState>(
    {
        [Type.GET_ROOMS_SUCCESS]: (state, action) => {
          if (action?.payload?.rooms) {
              return { ...state, rooms: action.payload.rooms };
          }

          return state;
        },
    },
    initialState
);
