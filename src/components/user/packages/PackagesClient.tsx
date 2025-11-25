'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import PackagesContent from './PackagesContent';
import FilterSidebar from '@/components/user/packages/filter/FilterSidebar';
import { Package } from '@/types/Package';
import SortTools from './SortTools';
import { DEFAULT_PRICE_MAX, DEFAULT_PRICE_MIN, DEFAULT_SORT_TYPE, DEFAULT_LIMIT } from '@/constants/packages';
import { fetchPackages } from '@/libs/api/packages';

interface PackagesClientProps {
  initialPackages: Package[];
  initialTotalPages: number;
  initialCurrentPage: number;
}

export default function PackagesClient({
  initialPackages,
  initialTotalPages,
  initialCurrentPage,
}: PackagesClientProps) {
  const t = useTranslations('PackagesClient');
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const itemsPerPage = DEFAULT_LIMIT;

  const [sortType, setSortType] = useState(DEFAULT_SORT_TYPE);
  const [priceRange, setPriceRange] = useState<[number, number]>([DEFAULT_PRICE_MIN, DEFAULT_PRICE_MAX]);
  const [searchQuery, setSearchQuery] = useState('');
  const [whereQuery, setWhereQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');

  const fetchData = async () => {
    try {
      const data = await fetchPackages(
        sortType,
        priceRange[0],
        priceRange[1],
        searchQuery,
        whereQuery,
        dateQuery ? new Date(dateQuery).toISOString() : '',
        currentPage
      );
      if (data) {
        setPackages(data.packages);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      }
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [
    fetchData,
    sortType,
    priceRange,
    searchQuery,
    whereQuery,
    dateQuery,
    currentPage,
  ]);

  return (
    <div className="shadow-lg">
      <SortTools sortType={sortType} setSortType={setSortType} />
      <div className="flex">
        <div className="w-2/3">
        <PackagesContent
          packages={packages}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        {packages.length === 0 && (
          <p className="text-center text-gray-500 w-full">{t("noPackagesFound")}</p>
        )}
        </div>
        <div className="w-1/3">
          <FilterSidebar
            setPriceRange={setPriceRange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            whereQuery={whereQuery}
            setWhereQuery={setWhereQuery}
            dateQuery={dateQuery}
            setDateQuery={setDateQuery}
            priceRange={priceRange}
          />
        </div>
      </div>
    </div>
  );
}
