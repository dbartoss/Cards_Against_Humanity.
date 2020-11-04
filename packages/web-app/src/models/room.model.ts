import { PlayerModel } from './player.model';

export interface RoomModel {
    id: string;
    name: string;
    players: PlayerModel[];
    createdAt?: string;
    currentRound?: CurrentRound;
}

export type GetRoomsApiResponse = RoomModel[];

export interface NewRoomDTO {
    name: string;
    userId: string;
}

export interface CurrentRound {
    _id: string;
    selector: string | null;
    mainCardText: string | null;
    mainCardGaps: number | null;
    currentlySelectedCards: CurrentlySelectedCard[];
}

export interface CurrentlySelectedCard {
    _id: string;
    userId: string;
    cardText: string;
}
