import type { PaginateModel as MongoPaginateModel, AggregatePaginateModel, Schema } from 'mongoose';

import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export type PaginateModel<T> = MongoPaginateModel<T> & AggregatePaginateModel<T>;

export const paginatePlugin = (schema: Schema) => {
  schema.plugin(mongoosePaginate);
  schema.plugin(mongooseAggregatePaginate);
};
