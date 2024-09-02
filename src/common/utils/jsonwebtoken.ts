import jwt from 'jsonwebtoken';

import { env } from '@/common/config/env';

export class JWT {
  static create<T extends Object & { id: string; issuedAt: Date }>(data: T): string {
    return jwt.sign(data, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRE_IN });
  }

  static verify<T extends Object & { id: string; issuedAt: Date }>(token: string): T {
    return jwt.verify(token, env.JWT_SECRET) as T;
  }
}
