import UserMenu from '@/components/commons/UserMenu/UserMenu';
import { useTranslations } from 'next-intl';

export default function ActionButton() {
  const t = useTranslations('Header');

  return (
    <div className="flex items-center space-x-4">
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md">
        {t('getInTouch')}
      </button>
      <UserMenu />
    </div>
  );
}
