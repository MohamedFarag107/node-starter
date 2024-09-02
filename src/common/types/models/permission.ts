import { Document } from 'mongoose';

import { Doc } from '@/common/types/models/doc';
import { UserDoc } from '@/common/types/models/user';
import { Permissions } from '@/common/types/permissions';

export type Permission = Doc & {
  userId: string | UserDoc;
  permissions: Permissions[];
};

export type PermissionMethods = {
  hasPermission: (permission: Permissions) => boolean;
  addPermission: (permission: Permissions) => void;
  removePermission: (permission: Permissions) => void;
};

export type PermissionDoc = Permission & Document & PermissionMethods
