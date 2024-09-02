import { ResponseMessageType } from '@/common/types/response-message-type';
import { getMessage } from '@/common/utils/get-message';
import { __ } from '@/common/utils/i18';

export const getResMessages = getMessage(ResponseMessageType.SUCCESS);
