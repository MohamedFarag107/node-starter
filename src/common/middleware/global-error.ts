import { NextFunction, Request, Response } from 'express';

import { ApiError } from '@/common/error/api-error';
import { InternalServerError } from '@/common/error/internal-server-error';
import { ResponseMessageType } from '@/common/types/response-message-type';
import { __ } from '@/common/utils/i18';
import { env } from '@/common/config/env';

export const globalErrorMiddleware = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  err.stack = env.isDevelopment ? err.stack : undefined;
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err);
  }

  const error = new InternalServerError([
    {
      message: __('error.internal-server-error'),
      type: ResponseMessageType.ERROR,
    },
    {
      message: err?.message || __('error.unknown-error'),
      type: ResponseMessageType.ERROR,
    },
  ]);

  res.status(error.statusCode).json({ ...error, stack: err.stack });
};
