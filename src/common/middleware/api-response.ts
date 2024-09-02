import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { asyncHandler } from '@/common/utils/async-handler';
import { ApiResArgs } from '@/common/types/api-response';
import { ResponseStatus } from '@/common/types/response-status';
import { __ } from '@/common/utils/i18';
import { getResMessages } from '@/common/utils/get-res-message';

export const apiResponseMiddleware = asyncHandler((_req, res, next) => {
  res.api = ({
    data,
    messages = __('success.default'),
    statusCode = StatusCodes.OK,
  }: ApiResArgs) => {
    const name = getReasonPhrase(statusCode);
    const status = ResponseStatus.SUCCESS;
    res
      .status(statusCode)
      .json({ status, statusCode, name, messages: getResMessages(messages), data });
  };

  next();
});
