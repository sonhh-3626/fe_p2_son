"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ReviewFormData } from '@/types/Review';
import { BookingWithReview } from '@/types/Booking';
import BookingInfoCard from './BookingInfoCard';
import ReviewFormHeader from './ReviewFormHeader';
import ReviewViewMode from './ReviewViewMode';
import ReviewEditMode from './ReviewEditMode';

interface ReviewFormClientProps {
  id: number;
  initialBookingData: BookingWithReview | null;
}

export default function ReviewFormClient({ id, initialBookingData }: ReviewFormClientProps) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Initial data is already fetched
  const [bookingData, setBookingData] = useState<BookingWithReview | null>(initialBookingData);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      title: '',
      content: '',
      images: [],
    },
  });

  useEffect(() => {
    if (initialBookingData?.review) {
      setRating(initialBookingData.review.rating);
      setValue('rating', initialBookingData.review.rating);
      setValue('title', initialBookingData.review.title);
      setValue('content', initialBookingData.review.content);
      if (initialBookingData.review.images && initialBookingData.review.images.length > 0) {
        setPreviewImages(initialBookingData.review.images);
        setIsEditing(true);
      }
    }
  }, [initialBookingData, setValue]);

  const fetchBookingAndReview = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/bookings/${id}/review`);
      const data: BookingWithReview = await response.json();

      setBookingData(data);

      if (data.review) {
        setRating(data.review.rating);
        setValue('rating', data.review.rating);
        setValue('title', data.review.title);
        setValue('content', data.review.content);

        if (data.review.images && data.review.images.length > 0) {
          setPreviewImages(data.review.images);
        }
      }
    } catch (error) {
      console.error('Error fetching booking and review:', error);
      alert('Không thể tải thông tin booking. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
    setValue('rating', value, { shouldValidate: true });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + previewImages.length > 5) {
      alert('Bạn chỉ có thể tải lên tối đa 5 ảnh');
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);

    const currentImages = watch('images') || [];
    setValue('images', [...currentImages, ...files]);
  };

  const removeImage = (index: number) => {
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newPreviews);

    const currentImages = watch('images') || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue('images', newImages);
  };

  const onSubmit = async (data: ReviewFormData) => {
    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('bookingId', id.toString());
      formData.append('rating', rating.toString());
      formData.append('title', data.title);
      formData.append('content', data.content);

      data.images.forEach((image) => {
        formData.append(`images`, image);
      });

      const method = bookingData?.review ? 'PUT' : 'POST';
      const url = bookingData?.review
        ? `/api/booking/${bookingData.review.id}/review`
        : '/api/reviews';

      await fetch(url, {
        method,
        body: formData,
      });

      alert(bookingData?.review ? 'Đánh giá đã được cập nhật!' : 'Đánh giá của bạn đã được gửi thành công!');
      router.push('/bookings');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (rating: number) => {
    const labels = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
    return labels[rating] || '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy thông tin booking</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const { booking, review } = bookingData;
  console.log(bookingData)
  const hasReview = !!review;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ReviewFormHeader hasReview={hasReview} />

        {/* Booking Info Card */}
        <BookingInfoCard booking={booking} />

        {/* Review Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm p-6">
          {hasReview && !isEditing ? (
            // View Mode
            <ReviewViewMode
              rating={rating}
              getRatingLabel={getRatingLabel}
              reviewTitle={watch('title')}
              reviewContent={watch('content')}
              previewImages={previewImages}
              reviewCreatedAt={review?.createdAt}
              setIsEditing={setIsEditing}
            />
          ) : (
            // Edit Mode
            <ReviewEditMode
              rating={rating}
              hoverRating={hoverRating}
              setHoverRating={setHoverRating}
              handleRatingClick={handleRatingClick}
              getRatingLabel={getRatingLabel}
              register={register}
              errors={errors}
              previewImages={previewImages}
              handleImageUpload={handleImageUpload}
              removeImage={removeImage}
              hasReview={hasReview}
              isSubmitting={isSubmitting}
              onCancel={() => {
                if (hasReview) {
                  setIsEditing(false);
                  fetchBookingAndReview();
                } else {
                  router.back();
                }
              }}
              submitButtonText={isSubmitting ? 'Đang xử lý...' : hasReview ? 'Cập nhật đánh giá' : 'Gửi đánh giá'}
            />
          )}
        </form>
      </div>
    </div>
  );
}
