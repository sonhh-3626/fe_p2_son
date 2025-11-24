import { FaSearch } from "react-icons/fa";
import { useTranslations } from 'next-intl';

interface SearchToolProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchTool({
  searchQuery,
  setSearchQuery
}: SearchToolProps) {
  const t = useTranslations('SearchTool');

  return (
    <div className="flex-1 relative">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={t('searchPlaceholder')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
