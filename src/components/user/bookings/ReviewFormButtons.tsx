"use client";

interface ReviewFormButtonsProps {
  hasReview: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  submitButtonText: string;
}

export default function ReviewFormButtons({
  hasReview,
  isSubmitting,
  onCancel,
  submitButtonText,
}: ReviewFormButtonsProps) {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Hủy
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {submitButtonText}
      </button>
    </div>
  );
}
