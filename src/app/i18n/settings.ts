import type {InitOptions} from 'i18next';

export const FALLBACK_LOCALE = 'en';
export const supportedLocales = ['en','vi'] as const;
export type Locales = (typeof supportedLocales)[number];

export const LANGUAGE_COOKIE = 'language';

export function getOptions(lang = FALLBACK_LOCALE, ns = 'common'): InitOptions {
  return {
    supportedLngs: supportedLocales,
    fallbackLng: FALLBACK_LOCALE,
    lng: lang,
    ns,
  };
}