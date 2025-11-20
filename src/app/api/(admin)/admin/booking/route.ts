import { Package } from '@/types/Package';
import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

interface Booking {
  id: number;
  userId: string;
  packageId: number;
  status: 'completed' | 'upcoming' | 'cancelled';
  checkIn: string;
  checkOut: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  numberOfTickets: number;
  paymentMethod?: string;
  message?: string;
}

interface BookingWithPackage extends Booking {
  package?: Package;
}

export async function GET(request: Request) {
  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbContent = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(dbContent);
    const bookings: Booking[] = data.bookings || [];
    const packages: Package[] = data.packages || [];

    const packageMap = new Map<number, Package>();
    packages.forEach((pkg) => {
      packageMap.set(pkg.id, pkg);
    });

    const bookingsWithPackages: BookingWithPackage[] = bookings.map((booking) => ({
      ...booking,
      package: packageMap.get(booking.packageId),
    }));

    return NextResponse.json(bookingsWithPackages, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
