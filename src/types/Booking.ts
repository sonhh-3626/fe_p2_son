export interface Package {
  id: number;
  title: string; // Changed from 'name' based on user's previous edit
  description: string;
  price: number;
  deadline: number; // Changed from 'duration' based on user's previous edit
  location: string;
  images: string[];
}

export interface Booking {
  id: number;
  userId: number;
  package?: Package;
  status: 'completed' | 'upcoming' | 'cancelled';
  checkIn: string;
  checkOut: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  numberOfTickets: number;
  message?: string;
  paymentMethod?: string;
}

export interface BookingWithReview {
  booking: Booking;
  review?: Review; // Review is imported from another file
}

import { Review } from './Review'; // Import Review from the new Review.ts file
