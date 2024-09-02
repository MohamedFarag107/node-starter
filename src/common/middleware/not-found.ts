import { NotFoundError } from '@/common/error/not-found-error';
import { asyncHandler } from '@/common/utils/async-handler';
import { __ } from '@/common/utils/i18';

export const notFoundHandler = asyncHandler((req) => {
  throw new NotFoundError(__('error.path-not-found'));
});
