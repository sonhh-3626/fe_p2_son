"use client";

import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { ReviewFormData } from '@/types/Review';
import ReviewRatingInput from './ReviewRatingInput';
import ReviewImageUpload from './ReviewImageUpload';
import ReviewFormButtons from './ReviewFormButtons';

interface ReviewEditModeProps {
  rating: number;
  hoverRating: number;
  setHoverRating: (value: number) => void;
  handleRatingClick: (value: number) => void;
  getRatingLabel: (value: number) => string;
  register: UseFormRegister<ReviewFormData>;
  errors: FieldErrors<ReviewFormData>;
  previewImages: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  hasReview: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  submitButtonText: string;
}

export default function ReviewEditMode({
  rating,
  hoverRating,
  setHoverRating,
  handleRatingClick,
  getRatingLabel,
  register,
  errors,
  previewImages,
  handleImageUpload,
  removeImage,
  hasReview,
  isSubmitting,
  onCancel,
  submitButtonText,
}: ReviewEditModeProps) {
  return (
    <>
      {/* Rating */}
      <ReviewRatingInput
        rating={rating}
        hoverRating={hoverRating}
        setHoverRating={setHoverRating}
        handleRatingClick={handleRatingClick}
        getRatingLabel={getRatingLabel}
      />

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tiêu đề đánh giá <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('title', {
            required: 'Vui lòng nhập tiêu đề',
            minLength: { value: 10, message: 'Tiêu đề phải có ít nhất 10 ký tự' },
            maxLength: { value: 100, message: 'Tiêu đề không được quá 100 ký tự' },
          })}
          placeholder="Tóm tắt trải nghiệm của bạn"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Content */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cảm nhận chi tiết <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('content', {
            required: 'Vui lòng nhập nội dung đánh giá',
            minLength: { value: 50, message: 'Nội dung phải có ít nhất 50 ký tự' },
          })}
          rows={6}
          placeholder="Chia sẻ chi tiết về trải nghiệm của bạn: dịch vụ, hướng dẫn viên, lịch trình, điểm đến..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
        />
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <ReviewImageUpload
        previewImages={previewImages}
        handleImageUpload={handleImageUpload}
        removeImage={removeImage}
      />

      {/* Submit Buttons */}
      <ReviewFormButtons
        hasReview={hasReview}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        submitButtonText={submitButtonText}
      />
    </>
  );
}
