import { notFound } from 'next/navigation';
import ReviewFormClient from '@/components/user/bookings/ReviewFormClient';
import { BookingWithReview } from '@/types/Booking';

interface TourReviewPageProps {
  params: {
    id:  string;
  }
}

async function getBookingAndReview(id: number): Promise<BookingWithReview | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/${id}/review`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch booking and review: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching booking and review:', error);
    return null;
  }
}

export default async function TourReviewPage({ params }: TourReviewPageProps) {
  const id = Number((await params).id);

  if (isNaN(id)) {
    notFound();
  }

  const initialBookingData = await getBookingAndReview(id);

  if (!initialBookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy thông tin booking</p>
        </div>
      </div>
    );
  }

  return (
    <ReviewFormClient id={id} initialBookingData={initialBookingData} />
  );
}
