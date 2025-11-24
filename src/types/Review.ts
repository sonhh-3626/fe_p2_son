export interface ReviewFormData {
  rating: number;
  title: string;
  content: string;
  images: File[];
}

export interface Review {
  id: number;
  bookingId: number;
  rating: number;
  title: string;
  content: string;
  images: string[];
  createdAt: string;
}
