import { useTranslations } from 'next-intl';
import { bookingTabs } from '@/constants/bookingTabs';

interface BookingTabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export default function BookingTabs({
  activeTab,
  setActiveTab
}: BookingTabsProps) {
  const t = useTranslations('BookingTabs');

  return (
    <div className="flex w-full mb-6 border-b border-gray-200">
      {bookingTabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 text-center px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === tab.id
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t(tab.label)}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          )}
        </button>
      ))}
    </div>
  );
}
