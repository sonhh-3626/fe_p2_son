import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/libs/utils/db';
import { Booking } from '@/types/Booking';
import { Package } from '@/types/Package';
import { createReview, findBooking, parseRequest, reviewExists, saveImages, validateInputs } from '@/utils/booking';

interface BookingRes extends Booking {
  packageId: number;
}

interface Review {
  id: number;
  bookingId: number;
  rating: number;
  title: string;
  content: string;
  images: string[];
  createdAt: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = parseInt((await params).id);

    const db = await readJsonFile();
    const allBookings: (BookingRes & { review?: Review })[] = db.bookings || [];
    const allPackages: Package[] = db.packages || [];
    const allReviews: Review[] = db.reviews || [];

    const booking = allBookings.find(
      (b) => b.id === bookingId
    );

    if (!booking) {
      return NextResponse.json(
        { error: `${bookingId} Booking not found` },
        { status: 404 }
      );
    }

    // Get package details
    const packageDetails = allPackages.find(
      (p) => booking.packageId && p.id === booking.packageId
    );
    // Get review details
    const reviewDetails = allReviews.find(
      (r) => r.bookingId === booking.id
    );

    // Kiểm tra booking đã completed chưa
    if (booking.status !== 'completed') {
      return NextResponse.json(
        { error: 'Can only review completed bookings' },
        { status: 400 }
      );
    }

    const response = {
      booking: {
        id: booking.id,
        userId: booking.userId,
        status: booking.status,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        createdAt: booking.createdAt,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        numberOfTickets: booking.numberOfTickets,
        message: booking.message,
        paymentMethod: booking.paymentMethod,
        package: packageDetails ? {
          id: packageDetails.id,
          name: packageDetails.title,
          description: packageDetails.description,
          price: packageDetails.price,
          duration: packageDetails.deadline,
          location: packageDetails.location,
          images: packageDetails.images
        } : null
      },
      review: reviewDetails ? {
        id: reviewDetails.id,
        bookingId: reviewDetails.bookingId,
        rating: reviewDetails.rating,
        title: reviewDetails.title,
        content: reviewDetails.content,
        images: reviewDetails.images || [],
        createdAt: reviewDetails.createdAt
      } : null
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching booking and review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { bookingId, rating, title, content, images } = await parseRequest(request, params);

    const validationError = validateInputs(bookingId, rating, title, content);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const db = await readJsonFile();
    db.reviews = db.reviews || [];

    const booking = findBooking(db, bookingId);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status !== "completed") {
      return NextResponse.json({ error: "Can only review completed bookings" }, { status: 400 });
    }

    if (reviewExists(db, bookingId)) {
      return NextResponse.json({ error: "Review already exists for this booking" }, { status: 409 });
    }

    const imagePaths = await saveImages(images);
    const newReview = createReview(db, {
      bookingId,
      rating,
      title,
      content,
      images: imagePaths,
    });

    await writeJsonFile(db);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const reviewId = parseInt(params.id);
    const formData = await request.formData();
    const rating = parseInt(formData.get('rating') as string);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const newImages = formData.getAll('images') as File[]; // New images being uploaded
    const existingImageUrls = formData.getAll('existingImages') as string[]; // Existing image URLs to keep

    if (isNaN(reviewId) || !rating || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await readJsonFile();
    db.reviews = db.reviews || []; // Ensure reviews array exists
    let allReviews: Review[] = db.reviews;

    const reviewIndex = allReviews.findIndex((r) => r.id === reviewId);

    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const existingReview = allReviews[reviewIndex];

    // Handle image updates
    let updatedImagePaths = existingImageUrls.filter(url => url.startsWith('/uploads/reviews/'));

    if (newImages.length > 0) {
      const newlyUploadedImagePaths = await saveImages(newImages);
      updatedImagePaths = [...updatedImagePaths, ...newlyUploadedImagePaths];
    }

    const updatedReview: Review = {
      ...existingReview,
      rating,
      title,
      content,
      images: updatedImagePaths,
      createdAt: new Date().toISOString(),
    };

    allReviews[reviewIndex] = updatedReview;
    db.reviews = allReviews;
    await writeJsonFile(db);

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
