import { Schema } from 'mongoose';

export const timestampPlugin = (schema: Schema) => {
  schema.set('timestamps', true);
};
