import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';

const DEFAULT_LOCALE = 'zh';
const SUPPORTED_LOCALES = ['en', 'zh'] as const;

type Locale = (typeof SUPPORTED_LOCALES)[number];

function getInitialLocale(): Locale {
  const storage = typeof window !== 'undefined' ? window.localStorage : undefined;
  const saved = storage?.getItem('preferred-locale');
  if (saved && SUPPORTED_LOCALES.includes(saved as Locale)) {
    return saved as Locale;
  }

  const browserLanguage = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : undefined;
  if (browserLanguage && SUPPORTED_LOCALES.includes(browserLanguage as Locale)) {
    return browserLanguage as Locale;
  }

  return DEFAULT_LOCALE;
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    en,
    zh
  }
});

export function setLocale(locale: Locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    return;
  }

  i18n.global.locale.value = locale;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('preferred-locale', locale);
  }
}

export function getSupportedLocales() {
  return SUPPORTED_LOCALES;
}
