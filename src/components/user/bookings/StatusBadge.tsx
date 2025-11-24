import { useTranslations } from 'next-intl';
import { BOOKING_STATUS_CONFIG } from '@/constants/bookingStatus';
import { Booking } from "@/types/Booking";

interface StatusBadgeProps {
  status: Booking['status'];
}

export default function StatusBadge({
  status
}: StatusBadgeProps) {
  const t = useTranslations('BookingCard');
  const config = BOOKING_STATUS_CONFIG[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {t(config.label)}
    </span>
  );
};
