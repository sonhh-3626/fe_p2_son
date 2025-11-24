"use client";

import { FiStar } from 'react-icons/fi';

interface ReviewRatingInputProps {
  rating: number;
  hoverRating: number;
  setHoverRating: (value: number) => void;
  handleRatingClick: (value: number) => void;
  getRatingLabel: (value: number) => string;
}

export default function ReviewRatingInput({
  rating,
  hoverRating,
  setHoverRating,
  handleRatingClick,
  getRatingLabel,
}: ReviewRatingInputProps) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Đánh giá tổng quan <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleRatingClick(value)}
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform hover:scale-110"
          >
            <FiStar
              className={`w-10 h-10 transition-colors ${
                value <= (hoverRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      {(hoverRating || rating) > 0 && (
        <p className="text-sm font-medium text-gray-700">
          {getRatingLabel(hoverRating || rating)}
        </p>
      )}
    </div>
  );
}
