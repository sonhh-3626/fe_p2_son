import { Package } from './Package';
import { Review } from './Review';

export interface Booking {
  id: number;
  userId: number;
  package?: Package;
  status: 'completed' | 'upcoming' | 'cancelled';
  birthday: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  numberOfTickets: number;
  message?: string;
  paymentMethod?: string;
  paymentStatus?: 'paid' | 'failed' | 'unpaid';
  paidAt?: string;
}

export interface BookingWithReview {
  booking: Booking;
  review?: Review;
}
