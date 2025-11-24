import { Booking } from "@/types/Booking";

interface StatusConfig {
  bg: string;
  text: string;
  label: string;
}

export const BOOKING_STATUS_CONFIG: Record<Booking['status'], StatusConfig> = {
  completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'statusCompleted' },
  upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'statusUpcoming' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'statusCancelled' }
};
