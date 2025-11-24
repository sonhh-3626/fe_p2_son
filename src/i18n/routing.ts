import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'vi'];

export const routing = defineRouting({
  locales,

  defaultLocale: 'vi'
});
