import { persistentAtom } from '@nanostores/persistent';

export type Locale = 'en' | 'ko';

export const $locale = persistentAtom<Locale>('$locale', 'en');

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: 'Korean',
};
