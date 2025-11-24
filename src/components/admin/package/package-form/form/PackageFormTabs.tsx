import { PACKAGE_FORM_TABS, Tab } from '@/constants/packageForm';

export default function PackageFormTabs({ activeTab, setActiveTab }: any) {
  return (
    <div className="px-8 pt-6 pb-2 shrink-0">
      <div className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
        {PACKAGE_FORM_TABS.map((tab: Tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
