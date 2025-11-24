import { Package } from "./Package";

export interface Booking {
  id: number;
  package?: Package;
  status: 'completed' | 'upcoming' | 'cancelled';
  checkIn: string;
  checkOut: string;
  createdAt: string;
}
