"use client";

import { FiUpload, FiX } from 'react-icons/fi';

interface ReviewImageUploadProps {
  previewImages: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

export default function ReviewImageUpload({
  previewImages,
  handleImageUpload,
  removeImage,
}: ReviewImageUploadProps) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Hình ảnh (Tối đa 5 ảnh)
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <FiUpload className="w-12 h-12 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">
            Nhấn để tải ảnh lên
          </span>
          <span className="text-xs text-gray-400 mt-1">
            PNG, JPG tối đa 5MB
          </span>
        </label>
      </div>

      {/* Image Previews */}
      {previewImages.length > 0 && (
        <div className="grid grid-cols-5 gap-3 mt-4">
          {previewImages.map((preview, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
