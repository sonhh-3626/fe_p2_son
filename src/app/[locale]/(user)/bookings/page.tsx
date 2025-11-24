'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { RootState, AppDispatch } from '@/store/store';
import { fetchBookings, setActiveTab, setSearchQuery, setSortBy, selectFilteredBookings } from '@/store/bookingsSlice';
import BookingCard from '@/components/user/bookings/BookingCard';
import SortTool from '@/components/user/bookings/SortTool';
import SearchTool from '@/components/user/bookings/SearchTool';
import Pagination from '@/components/user/packages/Pagination';
import BookingTabs from '@/components/user/bookings/BookingTabs';
import { Booking } from '@/types/Booking';
import { ITEMS_PER_PAGE } from '@/constants/pagination';

export default function BookingsPage() {
  const dispatch: AppDispatch = useDispatch();
  const t = useTranslations('BookingsPage');
  const { loading, error, activeTab, searchQuery, sortBy } = useSelector((state: RootState) => state.bookings);
  const filteredBookings = useSelector(selectFilteredBookings);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, sortBy]);

  const handleSetActiveTab = (tabId: string) => {
    dispatch(setActiveTab(tabId as 'upcoming' | 'completed' | 'cancelled'));
  };

  const handleSetSortBy = (sort: string) => {
    dispatch(setSortBy(sort as 'date' | 'title'));
  };

  const handleSetSearchQuery = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  if (loading) {
    return <div className="text-center py-12">{t('loadingBookings')}</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{t('errorLoadingBookings', { error })}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <BookingTabs activeTab={activeTab} setActiveTab={handleSetActiveTab} />

        <div className="flex gap-4 mb-6">
          <SortTool
            sortBy={sortBy}
            setSortBy={handleSetSortBy} />

          <SearchTool
            searchQuery={searchQuery}
            setSearchQuery={handleSetSearchQuery} />
        </div>

        <div className="space-y-4 mb-6">
          {paginatedBookings.length > 0 ? (
            paginatedBookings.map((booking: Booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">{t('noBookingsFound')}</p>
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
