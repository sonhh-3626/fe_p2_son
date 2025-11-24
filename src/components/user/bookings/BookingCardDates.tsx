import { useTranslations } from 'next-intl';
import { Booking } from "@/types/Booking";

interface BookingCardDatesProps {
  booking: Booking;
}

export default function BookingCardDates({ booking }: BookingCardDatesProps) {
  const t = useTranslations('BookingCard');

  return (
    <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
      <div>
        <span className="font-medium">{t('checkIn')}</span>
        <p>{booking.checkIn}</p>
      </div>
      <div>
        <span className="font-medium">{t('checkOut')}</span>
        <p>{booking.checkOut}</p>
      </div>
    </div>
  );
}
