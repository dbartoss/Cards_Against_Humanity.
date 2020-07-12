import * as mongoose from 'mongoose';
import { schemaSanitizer } from '../../helpers/schema-sanitizer';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  players: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const RoomSchema = schemaSanitizer(schema);
