import * as mongoose from 'mongoose';
import { schemaSanitizer } from '../../../helpers/schema-sanitizer';

const schema = new mongoose.Schema({
  type: { type: String, required: true },
  text: { type: String, required: true },
  fillSpaces: { type: Number, required: false }
});

export const CardsSchema = schemaSanitizer(schema);
