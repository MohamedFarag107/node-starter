import { StatusCodes } from 'http-status-codes';

import { ApiError } from '@/common/error/api-error';
import { getErrorMessage } from '@/common/utils/get-error-message';
import { ErrorMessageType } from '@/common/types/error-type';
import { __ } from '@/common/utils/i18';

export class ValidationError extends ApiError {
  constructor(args: ErrorMessageType = __('error.validation')) {
    super({
      statusCode: StatusCodes.BAD_REQUEST,
      errors: getErrorMessage(args),
    });
  }
}
