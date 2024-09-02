import { Handler } from 'express';
import { matchedData, ValidationChain, validationResult } from 'express-validator';

import { asyncHandler } from '@/common/utils/async-handler';
import { ValidationError } from '@/common/error/validation-error';
import { ErrorType } from '@/common/types/error-type';
import { ResponseMessageType } from '@/common/types/response-message-type';
import { capitalize } from '@/common/utils/capitalize';

export const validate = (validationSchema: ValidationChain[]): Handler[] => [
  validationSchema as any,
  asyncHandler(async (req, _res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      req.body = matchedData(req, { locations: ['body'] });
      req.query = matchedData(req, { locations: ['query'] });
      req.params = matchedData(req, { locations: ['params'] });
      return next();
    }

    const errors: ErrorType[] = result.array().map((error) => ({
      message: capitalize(error.msg),
      type: ResponseMessageType.VALIDATION,
      key: (error as any)?.path || '',
    }));

    throw new ValidationError(errors);
  }),
];
