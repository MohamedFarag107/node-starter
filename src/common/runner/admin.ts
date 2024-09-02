import { env } from '../config/env';
import { UserModel } from '../models/user';
import { Role } from '../types/role';
import logger from '../utils/logger';
import { Password } from '../utils/password';

export const createAdminsOnServerStart = async () => {
  const isAdminExists = await UserModel.exists({ email: env.ADMIN_EMAIL });

  if (isAdminExists) {
    logger.info(`Admin already exists`);
    return;
  }

  const hash = await Password.toHash(env.ADMIN_PASSWORD);
  const admin = await UserModel.create({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL,
    password: hash,
    role: Role.ADMIN,
  });

  logger.info(`Admin created: ${admin.name}`);
};
