import { PlayerModel } from '../../models/player.model';
import { RoomModel } from '../../models/room.model';
import { RoomsState } from '../reducers/rooms.reducer';
import { RootState } from '../reducers/root.reducer';


export const roomsSelector = (state: RootState): RoomsState => state.rooms;
export const roomsItemsSelector = (state: RootState): RoomModel[] => roomsSelector(state).rooms;

export const openRoomsSelector = (state: RootState): RoomModel[] =>
    roomsItemsSelector(state).filter((room: RoomModel) =>
        room.players.some((player: PlayerModel) => !player?.ableToStartGame
    ));
