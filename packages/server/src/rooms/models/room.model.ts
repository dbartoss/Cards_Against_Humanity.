import { Document } from 'mongoose';

export interface IRoom extends Document {
  id: string;
  name: string;
  createdAt: Date;
  players: string[];
}

// export interface IRoomDetails extends Document {
//
// }
