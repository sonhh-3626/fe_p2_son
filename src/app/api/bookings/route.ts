import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';
import { Package } from '@/types/Package';
import { Booking as BaseBooking } from '@/types/Booking';

interface Booking extends BaseBooking {
  packageId: number;
}

export async function GET() {
  const filePath = path.join(process.cwd(), 'db.json');
  try {
    const jsonData = await fsPromises.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    const bookings: Booking[] = data.bookings;
    const packages: Package[] = data.packages;

    const combinedBookings = bookings.map(booking => {
      const relatedPackage = packages.find(pkg => pkg.id === booking.packageId);
      if (!relatedPackage) {
        return {
          ...booking,
          package: undefined,
        };
      }

      return {
        ...booking,
        package: relatedPackage,
      };
    });

    return NextResponse.json(combinedBookings);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch bookings', error: (error as Error).message }, { status: 500 });
  }
}
