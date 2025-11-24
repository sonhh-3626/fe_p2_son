import Image from 'next/image';
import { Booking } from "@/types/Booking";

interface BookingCardImageProps {
  booking: Booking;
}

export default function BookingCardImage({ booking }: BookingCardImageProps) {
  return (
    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
      <Image
        src={booking.package?.img || '/images/placeholder.jpg'}
        alt={booking.package?.title || 'N/A'}
        width={96}
        height={96}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
