import { Handler, NextFunction, Request, Response } from 'express';

export const asyncHandler = (fn: Handler) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
