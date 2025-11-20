import { useTranslations } from 'next-intl';

export default function ResultsCount({ showing, total }: { showing: number; total: number }) {
  const t = useTranslations('ResultsCount');
  return (
    <div className="mt-4 text-sm text-gray-600">
      {t('showing')} <span className="font-semibold">{showing}</span> {t('of')}{' '}
      <span className="font-semibold">{total}</span> {t('results')}
    </div>
  );
}
