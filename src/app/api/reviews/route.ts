import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { readJsonFile, writeJsonFile } from '@/libs/utils/db';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    const formData = await req.formData();
    const bookingId = formData.get('bookingId');
    const rating = formData.get('rating');
    const title = formData.get('title');
    const content = formData.get('content');
    const images = formData.getAll('images') as File[];

    if (!bookingId || !rating || !title || !content) {
      return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    // Handle image uploads (store them and get their URLs)
    const imageUrls: string[] = [];
    if (images && images.length > 0) {
      for (const image of images) {
        console.log(`Simulating image upload for: ${image.name}`);
        imageUrls.push(`temp_image_url/${image.name}`); // Placeholder
      }
    }

    const db = await readJsonFile();
    if (!db.reviews) {
      db.reviews = [];
    }

    const newReview = {
      id: (db.reviews.length > 0 ? Math.max(...db.reviews.map((r: any) => r.id)) + 1 : 1),
      bookingId: parseInt(bookingId.toString()),
      userId: session.user.id,
      rating: parseInt(rating.toString()),
      title: title.toString(),
      content: content.toString(),
      images: imageUrls,
      createdAt: new Date().toISOString(),
    };

    db.reviews.push(newReview);
    await writeJsonFile(db);

    return new NextResponse(JSON.stringify(newReview), { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
