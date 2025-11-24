import { Booking } from '../../types/Booking';

export const fetchBookingsAPI = async (): Promise<Booking[]> => {
  const response = await fetch(`/api/bookings`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: Booking[] = await response.json();
  return data;
};
