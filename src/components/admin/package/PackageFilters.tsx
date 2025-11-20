import { LuSearch, LuMapPin } from "react-icons/lu";
import { useTranslations } from "next-intl";
import InputWithIcon from './InputWithIcon';

interface PackageFiltersProps {
  searchTerm: string;
  locationFilter: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

export default function PackageFilters({
  searchTerm,
  locationFilter,
  onSearchChange,
  onLocationChange
}: PackageFiltersProps) {
  const t = useTranslations('PackageFilters');
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithIcon
          icon={<LuSearch className="w-5 h-5" />}
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={onSearchChange}
        />

        <InputWithIcon
          icon={<LuMapPin className="w-5 h-5" />}
          placeholder={t('locationFilterPlaceholder')}
          value={locationFilter}
          onChange={onLocationChange}
        />
      </div>
    </div>
  );
}
