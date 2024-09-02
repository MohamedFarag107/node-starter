import { model, Schema } from 'mongoose';

import { Permission, PermissionDoc } from '@/common/types/models/permission';
import { Models } from '@/common/types/models';
import { PaginateModel, paginatePlugin } from '@/common/plugins/paginate';
import { timestampPlugin } from '@/common/plugins/timestamp';
import { Permissions } from '@/common/types/permissions';


const permissionSchema = new Schema<Permission>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: Models.User,
  },
  permissions: {
    type: [String],
    enum: Object.values(Permissions),
    default: [],
  },
});

permissionSchema.methods.hasPermission = function (
  this: PermissionDoc,
  permission: Permissions,
) {
  const permissionSet = new Set(this.permissions);
  return permissionSet.has(permission);
};

permissionSchema.methods.addPermission = async function (
  this: PermissionDoc,
  permissions: Permissions[],
) {
  const permissionSet = new Set(this.permissions);
  permissions.forEach((permission) => permissionSet.add(permission));
  this.permissions = [...permissionSet];
  await this.save();
};

permissionSchema.methods.removePermission = async function (
  this: PermissionDoc,
  permissions: Permissions[],
) {
  const permissionSet = new Set(this.permissions);
  permissions.forEach((permission) => permissionSet.delete(permission));
  this.permissions = [...permissionSet];
  await this.save();
};

paginatePlugin(permissionSchema);
timestampPlugin(permissionSchema);

permissionSchema.index({ userId: 1 }, { unique: true });

export const PermissionModel = model<Permission, PaginateModel<PermissionDoc>>(
  Models.Permission,
  permissionSchema,
  Models.Permission,
);
