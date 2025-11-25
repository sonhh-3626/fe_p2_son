'use client';

import { useState } from 'react';
import { Booking } from '@/types/Booking';
import ContactInfo from './ContactInfo';
import PaymentMethod from './PaymentMethod';
import BookingSummary from './BookingSummary';

interface BookingDetailClientProps {
  initialBooking: Booking;
}

export default function BookingDetailClient({ initialBooking }: BookingDetailClientProps) {
  const [booking, setBooking] = useState<Booking>(initialBooking);

  const handleBookingChange = (updatedFields: Partial<Booking>) => {
    setBooking(prevBooking => ({
      ...prevBooking,
      ...updatedFields,
    }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ContactInfo booking={booking} onBookingChange={handleBookingChange} />
        <PaymentMethod booking={booking} onBookingChange={handleBookingChange} />
      </div>
      <div className="lg:col-span-1">
        <BookingSummary booking={booking} />
      </div>
    </div>
  );
}
