import { asyncHandler } from '@/common/utils/async-handler';
import { i18n } from '@/common/utils/i18';
import { ACCEPT_LANGUAGE } from '../constants/accept-language';

export const setLocaleMiddleware = asyncHandler((req, res, next) => {
  let locale = req.headers['accept-language'] || 'en';
  locale = ACCEPT_LANGUAGE.includes(locale) ? locale : 'en';
  i18n.setLocale(locale);
  next();
});
