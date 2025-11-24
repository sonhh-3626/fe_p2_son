"use client";

import { FiStar } from 'react-icons/fi';
import { Review } from '@/types/Review';

interface ReviewViewModeProps {
  rating: number;
  getRatingLabel: (value: number) => string;
  reviewTitle: string;
  reviewContent: string;
  previewImages: string[];
  reviewCreatedAt?: string;
  setIsEditing: (isEditing: boolean) => void;
}

export default function ReviewViewMode({
  rating,
  getRatingLabel,
  reviewTitle,
  reviewContent,
  previewImages,
  reviewCreatedAt,
  setIsEditing,
}: ReviewViewModeProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <FiStar
              key={value}
              className={`w-8 h-8 ${
                value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-lg font-medium text-gray-700">
            {getRatingLabel(rating)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Chỉnh sửa
        </button>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{reviewTitle}</h3>
        <p className="text-gray-600 whitespace-pre-line break-words">
          {reviewContent}
        </p>
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((image, index) => (
            <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`Review ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {reviewCreatedAt && (
        <div className="text-sm text-gray-500">
          Đánh giá vào {new Date(reviewCreatedAt).toLocaleDateString('vi-VN')}
        </div>
      )}
    </div>
  );
}
