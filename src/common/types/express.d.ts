import { ApiRes } from '@/common/types/api-response';
import { UserDoc } from '@/common/types/models/user';
import { PermissionDoc } from '@/common/types/models/permission';

declare global {
  namespace Express {
    export interface Request {
      user?: UserDoc;
      permission?: PermissionDoc;
    }

    export interface Response {
      api: ApiRes;
    }
  }
}
