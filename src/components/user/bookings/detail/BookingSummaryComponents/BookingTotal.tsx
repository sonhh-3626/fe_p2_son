import { useTranslations } from 'next-intl';

interface BookingTotalProps {
  total: number;
}

export default function BookingTotal({ total }: BookingTotalProps) {
  const t = useTranslations('BookingSummary');

  return (
    <div className="border-t-2 border-gray-900 pt-4 mb-6">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900">{t('total')}:</span>
        <span className="text-2xl font-bold text-gray-900">{total.toLocaleString()} $</span>
      </div>
    </div>
  );
}
