import { Document } from 'mongoose';

export interface ICard extends Document {
  type: string;
  text: string;
  fillSpaces: number;
}