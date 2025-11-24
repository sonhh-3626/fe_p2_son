import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';

export default  function SettingsSection() {
  const t = useTranslations('Header');
  return (
    <div className="p-4 border-t bg-gray-50">
      <h4 className="text-sm font-medium text-gray-600 mb-3">{t('settings')}</h4>
      <LanguageSelector />
    </div>
  );
}
