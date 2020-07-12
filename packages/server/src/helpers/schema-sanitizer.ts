import { Schema } from 'mongoose';

export const schemaSanitizer = (schema: Schema): Object =>
  schema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
