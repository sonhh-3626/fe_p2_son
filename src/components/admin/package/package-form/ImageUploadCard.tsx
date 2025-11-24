'use client';

import { Controller } from 'react-hook-form';
import { FiImage, FiTrash2 } from 'react-icons/fi';

export default function ImageUploadCard({ index, control, remove, watch }: any) {
  const imageUrl = watch(`images.${index}`);

  return (
    <div className="relative group bg-gray-50 rounded-xl border border-gray-200 p-3">
      <div className="aspect-video w-full bg-gray-200 rounded-lg mb-3 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Gallery ${index}`}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x250?text=No+Image')}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <FiImage size={32} />
          </div>
        )}
      </div>
      <Controller
        name={`images.${index}`}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="url"
            placeholder="Dán URL hình ảnh vào đây..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        )}
      />
      <button
        type="button"
        onClick={() => remove(index)}
        className="absolute top-2 right-2 bg-white/90 p-1.5 text-red-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
      >
        <FiTrash2 size={16} />
      </button>
    </div>
  );
}
