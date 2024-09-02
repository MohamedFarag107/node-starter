import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { ResponseStatus } from '@/common/types/response-status';
import { ErrorType } from '@/common/types/error-type';

type ApiErrorType = {
  statusCode: StatusCodes;
  errors: ErrorType[];
};

export class ApiError extends Error {
  status: ResponseStatus;
  statusCode: StatusCodes;
  errors: ErrorType[];
  constructor({ errors, statusCode }: ApiErrorType) {
    super();
    this.status = ResponseStatus.ERROR;
    this.statusCode = statusCode;
    this.name = getReasonPhrase(statusCode);
    this.errors = errors;
  }
}
