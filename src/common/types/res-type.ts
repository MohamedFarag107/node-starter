import { ResponseMessageType } from '@/common/types/response-message-type';

export type ResType = {
  message: string;
  type: ResponseMessageType;
};

export type ResMessageType = string | string[] | ResType | ResType[];
