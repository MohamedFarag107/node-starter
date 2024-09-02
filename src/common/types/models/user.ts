import { Document } from 'mongoose';

import { Doc } from '@/common/types/models/doc';
import { PermissionDoc, PermissionMethods } from '@/common/types/models/permission';
import { Role } from '@/common/types/role';

export type User = Doc & {
  name: string;
  email: string;
  password: string;
  lastSignInAt: Date;
  passwordChangedAt: Date;
  role: Role;
};

export type UserMethods = {
  createToken: () => string;
  verifyPassword: (password: string) => Promise<boolean>;
  getPermission: () => Promise<(PermissionDoc & PermissionMethods) | null>;
  isPasswordChangedAfter: (time: Date) => boolean;
};

export type UserDoc = User & Document & UserMethods
