import { I18n } from 'i18n';

import { LANGUAGE_DIR } from '@/common/constants/lang-dir';
import { ACCEPT_LANGUAGE } from '../constants/accept-language';

export const i18n = new I18n({
  locales: ACCEPT_LANGUAGE,
  directory: LANGUAGE_DIR,
  defaultLocale: 'en',
  header: 'Accept-Language',
  autoReload: true,
  objectNotation: true,
});

export const __ = i18n.__.bind(i18n);
