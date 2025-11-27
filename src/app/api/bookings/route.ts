import { NextResponse } from 'next/server';
import { Package } from '@/types/Package';
import { Booking as BaseBooking } from '@/types/Booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { bookingSchema } from '@/libs/schemas/bookingSchema';
import { readJsonFile, writeJsonFile } from '@/libs/utils/db';

interface Booking extends BaseBooking {
  packageId: number;
}

export async function GET() {
  try {
    const data = await readJsonFile();

    const bookings: Booking[] = data.bookings;
    const packages: Package[] = data.packages;

    const combinedBookings = bookings.map(booking => {
      const relatedPackage = packages.find(pkg => pkg.id === booking.packageId);
      return {
        ...booking,
        package: relatedPackage ?? undefined,
      };
    });

    return NextResponse.json(combinedBookings);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch bookings', error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (typeof body.packageId === 'string') {
      body.packageId = Number(body.packageId);
    }
    const t = (key: string) => key;
    const validatedData = bookingSchema(t).parse(body);

    const data = await readJsonFile();

    const bookings: Booking[] = data.bookings;

    const newBookingId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;

    const newBooking: Booking = {
      id: newBookingId,
      userId: session.user.id,
      packageId: validatedData.packageId,
      status: 'upcoming',
      birthday: validatedData.birthday,
      createdAt: new Date().toISOString(),
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      numberOfTickets: validatedData.numberOfTickets,
      message: validatedData.message,
    };

    data.bookings.push(newBooking);
    await writeJsonFile(data);

    return NextResponse.json({ message: 'Booking created successfully', booking: newBooking }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Failed to create booking', error: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}
