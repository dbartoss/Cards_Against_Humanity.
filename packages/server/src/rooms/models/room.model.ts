import { Document } from 'mongoose';

export interface IPlayerSchema {
  userId: string;
  currentPoints: number;
  ableToStartGame: boolean;
}

export interface SelectedCardsSchema {
  userId: string;
  cardText: string;
}

export interface RoundSchema {
  selector: string;
  mainCardText: string;
  mainCardGaps: number;
  currentlySelectedCards: SelectedCardsSchema[];
}

export interface IRoom extends Document {
  id: string;
  name: string;
  createdAt: Date;
  players: IPlayerSchema[];
  currentRound: RoundSchema
}
