import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PaymentPage from '@/components/user/payment/PaymentContent';
import { calculateTotalPrice } from '@/utils/booking';

interface PaymentPageProps {
  params: {
    id: string;
  };
}

export default async function BookingPaymentPage({ params }: PaymentPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const bookingId = Number((await params).id);

  // Fetch booking from json-server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/${bookingId}`);
  if (!res.ok) {
    notFound();
  }
  const booking = await res.json();

  // Verify ownership
  // if (booking.userId !== session.user.id) {
  //   redirect('/');
  // }

  // Redirect if already paid
  if (booking.paymentStatus === 'paid') {
    redirect(`/booking/${params.id}`);
  }

  return (
    <PaymentPage
      bookingId={bookingId}
      amount={calculateTotalPrice(booking)}
    />
  );
}
