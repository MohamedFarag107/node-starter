import { model, Schema } from 'mongoose';
import { isAfter } from 'date-fns';

import { PaginateModel, paginatePlugin } from '@/common/plugins/paginate';
import { timestampPlugin } from '@/common/plugins/timestamp';
import { User, UserDoc } from '@/common/types/models/user';
import { Models } from '@/common/types/models';
import { Role } from '@/common/types/role';
import { Password } from '@/common/utils/password';
import { JWT } from '@/common/utils/jsonwebtoken';
import { PermissionModel } from '@/common/models/permission';


const userSchema = new Schema<User>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  lastSignInAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.USER,
  },
});

userSchema.methods.verifyPassword = async function (this: UserDoc, password: string) {
  return Password.compare(this?.password || '', password);
};

userSchema.methods.createToken = function (this: UserDoc) {
  return JWT.create({ id: this.id, issuedAt: new Date() });
};

userSchema.methods.getPermission = async function (this: UserDoc) {
  return PermissionModel.findOne({ userId: this.id });
};

userSchema.methods.isPasswordChangedAfter = function (this: UserDoc, time: Date) {
  if (this.passwordChangedAt) {
    return isAfter(this.passwordChangedAt, time);
  }

  return false;
};

paginatePlugin(userSchema);
timestampPlugin(userSchema);

userSchema.pre('save', async function (this: UserDoc) {
  if (this.isNew) {
    await PermissionModel.create({ userId: this.id, permissions: [] });
  }
});

export const UserModel = model<User, PaginateModel<UserDoc>>(
  Models.User,
  userSchema,
  Models.User,
);
