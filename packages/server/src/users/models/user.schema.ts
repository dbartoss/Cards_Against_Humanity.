import * as mongoose from 'mongoose';
import { schemaSanitizer } from '../../helpers/schema-sanitizer';

const schema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    select: false,
  },
  createdAt: { type: Date, default: Date.now },
});

export const UserSchema = schemaSanitizer(schema);
