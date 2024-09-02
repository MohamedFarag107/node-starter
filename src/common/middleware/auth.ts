import { asyncHandler } from '@/common/utils/async-handler';
import { UnauthorizedError } from '@/common/error/unauthorized-error';
import { JWT } from '@/common/utils/jsonwebtoken';
import { UserModel } from '@/common/models/user';
import { Permissions } from '@/common/types/permissions';
import { ForbiddenError } from '@/common/error/forbidden-error';

export const authMiddleware = asyncHandler(async (req, _res, next) => {
  const token = req.headers.authorization?.split(' ')?.[1];

  if (!token) {
    throw new UnauthorizedError();
  }

  const { id, issuedAt } = JWT.verify<{ id: string; issuedAt: Date }>(token);

  const user = await UserModel.findById(id);

  if (!user) {
    throw new UnauthorizedError();
  }

  req.user = user;

  const isPasswordChangedAfterTokenIssued = user.isPasswordChangedAfter(new Date(issuedAt));

  if (isPasswordChangedAfterTokenIssued) {
    throw new UnauthorizedError();
  }

  const permission = await user.getPermission();

  if (!permission) {
    throw new UnauthorizedError();
  }

  req.permission = permission;

  next();
});

export const checkPermission = (permissions: Permissions[]) =>
  asyncHandler(async (req, _res, next) => {
    const hasPermission = permissions.some((permission) =>
      req?.permission?.hasPermission(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenError();
    }

    next();
  });
