'use client';

import { useEffect, useMemo } from 'react';
import { Calendar, Mail, Phone, User } from 'lucide-react';
import DataTable from '@/components/commons/table/DataTable';

import { useAdminBookings } from '@/hooks/useAdminBookings';
import Link from 'next/link';
import { TableColumn } from '@/types/Package';
import { Booking } from '@/types/Booking';
import LoadingState from '@/components/admin/package/LoadingState';
import PageHeader from '@/components/admin/package/PageHeader';
import BookingFilters from '@/components/admin/booking/BookingFilters';
import ResultsCount from '@/components/admin/package/ResultsCount';
import EmptyState from '@/components/admin/package/EmptyState';
import Pagination from '@/components/admin/package/Pagination';

export default function AdminBookingListPage() {
  const {
    loading,
    paginatedBookings,
    totalPages,
    processedBookings,
    searchTerm,
    statusFilter,
    sortConfig,
    currentPage,
    setSearchTerm,
    setStatusFilter,
    setSortConfig,
    setCurrentPage,
    fetchBookings,
  } = useAdminBookings();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const columns: TableColumn<Booking>[] = useMemo(() => [
    {
      key: 'name',
      label: 'Khách hàng',
      sortable: true,
      render: (booking) => (
        <div>
          <div className="font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            {booking.name}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <Mail className="w-3 h-3" />
            {booking.email}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <Phone className="w-3 h-3" />
            {booking.phone}
          </div>
        </div>
      ),
      width: '25%',
    },
    {
      key: 'package',
      label: 'Gói Tour',
      sortable: true,
      render: (booking) => (
        <div>
          <div className="font-medium text-gray-900">{booking.package?.title || 'N/A'}</div>
          {booking.package?.price && (
            <div className="text-sm text-green-700 font-semibold">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(booking.package.price)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (booking) => {
        const statusConfig = {
          completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Hoàn thành' },
          upcoming: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Sắp tới' },
          cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Hủy bỏ' }
        };

        const config = statusConfig[booking.status];
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
            {config.label}
          </span>
        );
      },
    },
    {
      key: 'checkIn',
      label: 'Ngày',
      sortable: true,
      render: (booking) => (
        <div className="text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            {new Date(booking.checkIn).toLocaleDateString('vi-VN')}
          </div>
          <div className="text-gray-500 text-xs mt-1">đến</div>
          <div>{new Date(booking.checkOut).toLocaleDateString('vi-VN')}</div>
        </div>
      ),
    },
    {
      key: 'numberOfTickets',
      label: 'Vé',
      sortable: true,
      render: (booking) => (
        <div className="text-gray-700 font-medium">{booking.numberOfTickets} vé</div>
      ),
    },
    {
      key: 'actions',
      label: 'Thao tác',
      headerAlign: 'right',
      cellAlign: 'right',
      render: (booking) => (
        <div className="flex gap-2 justify-end">
          <Link
            href={`/admin/booking/${booking.id}`}
            className="px-4 py-2 rounded-lg transition-colors text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Xem
          </Link>
        </div>
      ),
    },
  ], []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div>
      <PageHeader title="Quản lý Booking" description="Quản lý và theo dõi tất cả các đặt phòng" />

      <BookingFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />

      <ResultsCount
        showing={paginatedBookings.length}
        total={processedBookings.length}
      />

      {paginatedBookings.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={paginatedBookings}
            sortConfig={sortConfig}
            onSort={setSortConfig}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
