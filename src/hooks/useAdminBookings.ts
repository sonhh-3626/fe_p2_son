
import { useAdminBookingStore } from "@/store/adminBookingStore";
import { useMemo } from "react";
import { Booking } from "@/types/Booking";

export const useAdminBookings = () => {
  const {
    bookings,
    loading,
    searchTerm,
    statusFilter,
    sortConfig,
    currentPage,
    itemsPerPage,
    setSearchTerm,
    setStatusFilter,
    setSortConfig,
    setCurrentPage,
    fetchBookings,
    deleteBooking,
  } = useAdminBookingStore();

  const processedBookings = useMemo(() => {
    let result = [...bookings];

    if (searchTerm) {
      result = result.filter(
        (booking) =>
          booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      result = result.filter((booking) => booking.status === statusFilter);
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue: any = a[sortConfig.key as keyof Booking];
        let bValue: any = b[sortConfig.key as keyof Booking];

        if (sortConfig.key === "package") {
          aValue = a.package?.title || "";
          bValue = b.package?.title || "";
        }

        if (typeof aValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue as string)
            : (bValue as string).localeCompare(aValue);
        }

        if (typeof aValue === "number") {
          return sortConfig.direction === "asc"
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number);
        }

        return 0;
      });
    }

    return result;
  }, [bookings, searchTerm, statusFilter, sortConfig]);

  const totalPages = Math.ceil(processedBookings.length / itemsPerPage);
  const paginatedBookings = processedBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
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
    deleteBooking,
  };
};
