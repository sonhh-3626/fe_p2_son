import { useTranslations } from 'next-intl';
import StatusBadge from './StatusBadge';
import BookingCardLocation from './BookingCardLocation';
import BookingCardDates from './BookingCardDates';
import { Booking } from "@/types/Booking";

interface BookingCardDetailsProps {
  booking: Booking;
}

export default function BookingCardDetails({ booking }: BookingCardDetailsProps) {
  const t = useTranslations('BookingCard');

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{booking.package?.title || 'N/A'}</h3>
          <BookingCardLocation booking={booking} />
          <BookingCardDates booking={booking} />
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{t('bookingCode')}: {booking.id}</span>
      </div>
    </div>
  );
}
