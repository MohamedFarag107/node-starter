import { StatusCodes } from 'http-status-codes';

import { ResMessageType } from '@/common/types/res-type';

export type ApiResArgs = {
  statusCode?: StatusCodes;
  data: any;
  messages?: ResMessageType;
  pagination?: any;
};

export type ApiRes = (args: ApiResArgs) => void;
