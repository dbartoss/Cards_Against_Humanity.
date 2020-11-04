import { PlayerModel } from './player.model';

export interface RoomModel {
    id: string;
    name: string;
    players: PlayerModel[];
    createdAt?: string;
}

export type GetRoomsApiResponse = RoomModel[];
