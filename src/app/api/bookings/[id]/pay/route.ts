import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bankAccountId, amount } = await req.json();
    const bookingId = (await params).id;

    // Validate
    if (!bankAccountId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get booking
    const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/${bookingId}`);
    if (!bookingRes.ok) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    console.log(bookingRes);
    const booking = await bookingRes.json();

    // Check owner
    if (booking.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (booking.paymentStatus === 'paid') {
      return NextResponse.json(
        { error: 'Booking already paid' },
        { status: 400 }
      );
    }

    const paymentSuccess = Math.random() > 0.1;

    const transactionId = `TXN${Date.now()}`;

    if (paymentSuccess) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentStatus: 'paid',
          paymentMethod: 'bank_transfer',
          paidAt: new Date().toISOString(),
        }),
      });

      return NextResponse.json({
        success: true,
        message: 'Payment successful',
        transactionId,
      });
    } else {
      return NextResponse.json(
        {
          error:
            'Payment failed. Please try again or use another payment method.',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}
