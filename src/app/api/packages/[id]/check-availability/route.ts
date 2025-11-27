import { Booking } from '@/types/Booking';
import { Package } from '@/types/Package';
import { readJsonFile } from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { packageId, numberOfTickets } = await req.json();

    if (!packageId || !numberOfTickets) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    const db = await readJsonFile();
    const packages: Package[] = db.packages;
    const bookings: Booking[] = db.bookings;

    const userSelectedPackage = packages.find(p => p.id === packageId);

    if (!userSelectedPackage) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    const bookingsForThisDate = bookings.filter(
      (b: any) =>
        b.packageId === packageId
    );

    const totalBooked = bookingsForThisDate.reduce(
      (sum: number, b: any) => sum + Number(b.numberOfTickets),
      0
    );

    const remainingSlots =
      Number(userSelectedPackage.participants) - totalBooked;

    const enoughPeople = remainingSlots >= numberOfTickets;

    if (enoughPeople) {
      return NextResponse.json({
        ok: true,
        message: "The selected package is available.",
        remainingSlots
      });
    }

    const alternativePackages = packages
      .map(pkg => {
        const booked = bookings
          .filter(
            (b: any) =>
              b.packageId === pkg.id
          )
          .reduce((sum: number, b: any) => sum + Number(b.numberOfTickets), 0);

        const remaining = pkg.participants - booked;

        return {
          ...pkg,
          remainingSlots: remaining
        };
      })
      .filter(pkg =>
        pkg.remainingSlots >= numberOfTickets
      )
      .filter(pkg =>
        pkg.location === userSelectedPackage.location
      )
      .filter(pkg =>
        pkg.id !== packageId
      )

    return NextResponse.json({
      ok: false,
      message: "The selected package is not available.",
      remainingSlots,
      alternatives: alternativePackages
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
