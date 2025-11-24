import Link from 'next/link';
import { FiMapPin } from "react-icons/fi";
import { Booking } from "@/types/Booking";

interface BookingCardLocationProps {
  booking: Booking;
}

export default function BookingCardLocation({ booking }: BookingCardLocationProps) {
  return (
    <>
      {booking.package && (
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <FiMapPin className="w-3 h-3" />
          <Link href={booking.package.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            <span>{booking.package.location}</span>
          </Link>
        </div>
      )}
    </>
  );
}
