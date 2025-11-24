'use client';

import { Booking } from "@/types/Booking";
import BookingCardImage from './BookingCardImage';
import BookingCardDetails from './BookingCardDetails';
import BookingCardActions from './BookingCardActions';

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex gap-4 p-4">
        <BookingCardImage booking={booking} />
        <BookingCardDetails booking={booking} />
      </div>
      <BookingCardActions booking={booking} />
    </div>
  );
};
