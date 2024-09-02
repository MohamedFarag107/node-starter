import { ResponseMessageType } from '@/common/types/response-message-type';

export type ErrorType = {
  message: string;
  type: ResponseMessageType;
  key?: string;
};

export type ErrorMessageType = string | string[] | ErrorType | ErrorType[];
