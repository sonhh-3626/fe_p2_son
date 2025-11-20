import { create } from "zustand";
import { Booking } from "@/types/Booking";
import { SortConfig, SortDirection } from "@/types/Package";

type AdminBookingState = {
  bookings: Booking[];
  loading: boolean;
  searchTerm: string;
  statusFilter: string;
  sortConfig: SortConfig;
  currentPage: number;
  itemsPerPage: number;

  fetchBookings: () => Promise<void>;
  setSearchTerm: (s: string) => void;
  setStatusFilter: (status: string) => void;
  setSortConfig: (key: string) => void;
  setCurrentPage: (p: number) => void;
  deleteBooking: (id: number) => Promise<void>;
};

export const useAdminBookingStore = create<AdminBookingState>((set, get) => ({
  bookings: [],
  loading: false,
  searchTerm: "",
  statusFilter: "",
  sortConfig: { key: "createdAt", direction: "desc" },
  currentPage: 1,
  itemsPerPage: 5,

  fetchBookings: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/admin/booking");
      const data: Booking[] = await res.json();
      set({ bookings: data });
    } finally {
      set({ loading: false });
    }
  },

  setSearchTerm: (s) => set({ searchTerm: s, currentPage: 1 }),
  setStatusFilter: (status) => set({ statusFilter: status, currentPage: 1 }),
  setSortConfig: (key) =>
    set((state) => {
      let direction: SortDirection = "asc";
      if (state.sortConfig.key === key && state.sortConfig.direction === "asc") {
        direction = "desc";
      }
      return { sortConfig: { key, direction }, currentPage: 1 };
    }),
  setCurrentPage: (p) => set({ currentPage: p }),

  deleteBooking: async (id: number) => {
    try {
      await fetch(`/api/admin/booking/${id}`, { method: "DELETE" });
      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete booking:", error);
      throw error;
    }
  },
}));
