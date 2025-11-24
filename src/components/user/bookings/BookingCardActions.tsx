import { FiMessageSquare } from "react-icons/fi";
import { useTranslations } from 'next-intl';
import BookingActionButton from './BookingActionButton';
import { Booking } from "@/types/Booking";

interface BookingCardActionsProps {
  booking: Booking;
}

export default function BookingCardActions({ booking }: BookingCardActionsProps) {
  const t = useTranslations('BookingCard');

  return (
    <div className="border-t border-gray-100 px-4 py-3 flex gap-5 items-center justify-end bg-gray-50">
      <BookingActionButton className="text-blue-600 hover:text-blue-700">
        {t('manageBooking')}
      </BookingActionButton>
      {booking.status === 'completed' && (
        <BookingActionButton className="text-gray-700 hover:text-gray-900 flex items-center gap-1">
          <FiMessageSquare className="w-4 h-4" />
          {t('submitReview')}
        </BookingActionButton>
      )}
    </div>
  );
}
