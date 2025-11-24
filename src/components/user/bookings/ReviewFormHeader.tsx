"use client";

import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

interface ReviewFormHeaderProps {
  hasReview: boolean;
}

export default function ReviewFormHeader({ hasReview }: ReviewFormHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
      >
        <FiArrowLeft className="w-5 h-5" />
        <span>Quay lại</span>
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {hasReview ? 'Đánh giá của bạn' : 'Đánh giá tour'}
      </h1>
      <p className="text-gray-600">
        {hasReview ? 'Xem và chỉnh sửa đánh giá của bạn' : 'Chia sẻ trải nghiệm của bạn với cộng đồng'}
      </p>
    </div>
  );
}
