import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  username: string;
  readonly password: string;
  createdAt: Date;
}
