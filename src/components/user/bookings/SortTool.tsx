import { FaChevronDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from 'next-intl';

interface SortToolProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export default function SortTool({ sortBy, setSortBy }: SortToolProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('SortTool');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSortChange = (option: string) => {
    setSortBy(option);
    setIsOpen(false);
  };

  const getSortLabel = (key: string) => {
    switch (key) {
      case 'date':
        return t('sortByDate');
      case 'title':
        return t('sortByTitle');
      default:
        return t('sortByDate');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
      >
        <span className="text-gray-700">{t('sortBy')}: {getSortLabel(sortBy)}</span>
        <FaChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <button
            onClick={() => handleSortChange('date')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {t('sortByDate')}
          </button>
          <button
            onClick={() => handleSortChange('title')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {t('sortByTitle')}
          </button>
        </div>
      )}
    </div>
  );
}
