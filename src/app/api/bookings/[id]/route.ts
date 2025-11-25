import { NextResponse } from 'next/server';
import { getBookingById, updateBooking } from '@/libs/data/bookings';
import { Booking as BaseBooking } from '@/types/Booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { readJsonFile, writeJsonFile } from '@/libs/utils/db';

interface RequestProps {
  params: {
    id: string
  }
}

export async function GET(
  request: Request,
  { params }: RequestProps
) {
  const id = Number((await params).id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const booking = await getBookingById(id);

  if (!booking) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json(booking);
}

export async function PUT(
  request: Request,
  { params }: RequestProps
) {
  const id = Number((await params).id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const body = await request.json();
  const updatedBooking = await updateBooking(id, body);

  if (!updatedBooking) {
    return NextResponse.json({ message: 'Booking not found or update failed' }, { status: 404 });
  }

  return NextResponse.json(updatedBooking);
}

interface Booking extends BaseBooking {
  packageId: number;
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const bookingId = Number((await params).id);

    if (isNaN(bookingId)) {
      return NextResponse.json({ message: 'Invalid Booking ID' }, { status: 400 });
    }

    const data = await readJsonFile();
    const bookings: Booking[] = data.bookings;

    const bookingIndex = bookings.findIndex(b => b.id === bookingId);

    if (bookingIndex === -1) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    const updatedBooking = {
      ...bookings[bookingIndex],
      paymentStatus: body.paymentStatus ?? bookings[bookingIndex].paymentStatus,
      paymentMethod: body.paymentMethod ?? bookings[bookingIndex].paymentMethod,
      paidAt: body.paidAt ?? bookings[bookingIndex].paidAt,
      updatedAt: new Date().toISOString(),
    };

    bookings[bookingIndex] = updatedBooking;

    await writeJsonFile(data);

    return NextResponse.json({ message: 'Booking updated successfully', booking: updatedBooking }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Failed to update booking', error: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}
