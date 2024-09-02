import { ResponseMessageType } from '@/common/types/response-message-type';

export type ResMessage = {
  message: string;
  type: ResponseMessageType;
};

export type ResMessageType = string | string[] | ResMessage | ResMessage[];
