import { __ } from '@/common/utils/i18';
import { ErrorMessageType, ErrorType } from '@/common/types/error-type';
import { ResType, ResMessageType } from '@/common/types/res-type';
import { ResponseMessageType } from '@/common/types/response-message-type';

export const getMessage =
  (type: ResponseMessageType) =>
  (
    arg: ResMessageType | ErrorMessageType,
  ): typeof arg extends ResMessageType ? ResType[] : ErrorType[] => {
    if (typeof arg === 'string') {
      return [{ message: arg, type }];
    }

    if (Array.isArray(arg) && arg.every((item) => typeof item === 'string')) {
      return arg.map((message) => ({ message, type }));
    }

    if (typeof arg === 'object' && 'message' in arg) {
      return [arg];
    }

    if (Array.isArray(arg) && arg.every((item) => typeof item === 'object')) {
      return arg;
    }

    return [
      {
        message: __('error.internal-server-error'),
        type: ResponseMessageType.ERROR,
      },
    ];
  };
