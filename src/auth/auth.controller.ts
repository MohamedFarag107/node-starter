import { StatusCodes } from 'http-status-codes';

import { BadRequestError } from '@/common/error/bad-request-error';
import { UserModel } from '@/common/models/user';
import { asyncHandler } from '@/common/utils/async-handler';
import { __ } from '@/common/utils/i18';

export const signinController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    throw new BadRequestError(__('error.invalidEmailOrPassword'));
  }

  const isMatch = await user.verifyPassword(password);

  if (!isMatch) {
    throw new BadRequestError(__('error.invalidEmailOrPassword'));
  }

  const token = user.createToken();

  user.lastSignInAt = new Date();

  await user.save();

  const { password: _, ...userWithoutPassword } = user.toObject();

  res.api({
    statusCode: StatusCodes.OK,
    messages: __('signin.success'),
    data: { user: userWithoutPassword, token },
  });
});

export const getMeController = asyncHandler(async (req, res) => {
  res.api({
    statusCode: StatusCodes.OK,
    messages: __('getMe.success'),
    data: { user: req.user, permission: req.permission },
  });
});
