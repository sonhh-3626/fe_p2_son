import { createSlice, createSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Booking } from '../types/Booking';
import { RootState } from './store';
import { fetchBookingsAPI } from '../libs/api/bookings';

interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  activeTab: 'upcoming' | 'completed' | 'cancelled';
  searchQuery: string;
  sortBy: 'date' | 'title';
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
  lastFetched: null,
  activeTab: 'upcoming',
  searchQuery: '',
  sortBy: 'date',
};

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { getState }) => {
    const state = getState() as { bookings: BookingsState };
    const now = Date.now();
    if (state.bookings.lastFetched && (now - state.bookings.lastFetched < 5 * 60 * 1000)) {
      return state.bookings.bookings;
    }
    const response = await fetchBookingsAPI();
    return response;
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'upcoming' | 'completed' | 'cancelled'>) => {
      state.activeTab = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'date' | 'title'>) => {
      state.sortBy = action.payload;
    },
    updateBookingStatus: (state, action: PayloadAction<{ bookingId: number; newStatus: 'upcoming' | 'completed' | 'cancelled' }>) => {
      const { bookingId, newStatus } = action.payload;
      const booking = state.bookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = newStatus;
      }
    },
    deleteBooking: (state, action: PayloadAction<number>) => {
      const bookingId = action.payload;
      state.bookings = state.bookings.filter(booking => booking.id !== bookingId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'BookingsSlice.failedToFetchBookings';
      });
  },
});

export const { setActiveTab, setSearchQuery, setSortBy, updateBookingStatus, deleteBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;

const selectBookingsState = (state: RootState) => state.bookings;

export const selectFilteredBookings = createSelector(
  [selectBookingsState],
  (bookingsState) => {
    const { bookings, activeTab, searchQuery, sortBy } = bookingsState;

    let filtered = bookings.filter(booking => {
      const matchesTab = booking.status === activeTab;
      const matchesSearch = booking.package?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.package?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.id.toString().includes(searchQuery);
      return matchesTab && matchesSearch;
    });

    if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'title') {
      filtered = [...filtered].sort((a, b) => (a.package?.title || '').localeCompare(b.package?.title || ''));
    }

    return filtered;
  }
);
