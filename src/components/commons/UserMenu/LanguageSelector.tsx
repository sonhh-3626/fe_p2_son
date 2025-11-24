import { locales } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { languages } from '@/constants/languages';

const { useRouter, usePathname } = createNavigation({ locales });

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex flex-col text-black gap-2 mb-3 p-4">
      <label htmlFor="language-select" className="text-sm font-medium">
        Language
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
