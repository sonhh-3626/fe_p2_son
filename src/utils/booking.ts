import { Review } from '@/types/Review';
import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { Booking } from '@/types/Booking';

interface BookingRes extends Booking {
  packageId: number;
}

export async function parseRequest(request: NextRequest, params: { id: string }) {
  const bookingId = parseInt(params.id);
  const formData = await request.formData();

  return {
    bookingId,
    rating: parseInt(formData.get('rating') as string),
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    images: formData.getAll('images') as File[],
  };
}

export function validateInputs(bookingId: number, rating: number, title: string, content: string) {
  if (isNaN(bookingId) || !rating || !title || !content) {
    return 'Missing required fields';
  }
  return null;
}

export function findBooking(db: any, bookingId: number) {
  const bookings: (BookingRes & { review?: Review })[] = db.bookings || [];
  return bookings.find((b) => b.id === bookingId);
}

export function reviewExists(db: any, bookingId: number) {
  const reviews: Review[] = db.reviews || [];
  return reviews.find((r) => r.bookingId === bookingId);
}

export async function saveImages(images: File[]) {
  const imagePaths: string[] = [];
  if (images.length === 0) return imagePaths;

  const uploadDir = path.join(process.cwd(), 'public/uploads/reviews');
  try {
    await fs.promises.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error(`Error creating upload directory ${uploadDir}:`, error);
    throw new Error('Failed to create upload directory.');
  }

  for (const imageFile of images) {
    try {
      const uniqueFileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadDir, uniqueFileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.promises.writeFile(filePath, buffer);
      imagePaths.push(`/uploads/reviews/${uniqueFileName}`);
    } catch (error) {
      console.error(`Error saving image ${imageFile.name}:`, error);
      throw new Error(`Failed to save image: ${imageFile.name}`);
    }
  }

  return imagePaths;
}

export function createReview(db: any, data: {
  bookingId: number;
  rating: number;
  title: string;
  content: string;
  images: string[];
}) {
  const allReviews: Review[] = db.reviews || [];
  const newReview: Review = {
    id: allReviews.length > 0 ? Math.max(...allReviews.map(r => r.id)) + 1 : 1,
    bookingId: data.bookingId,
    rating: data.rating,
    title: data.title,
    content: data.content,
    images: data.images,
    createdAt: new Date().toISOString(),
  };

  db.reviews.push(newReview);
  return newReview;
}
