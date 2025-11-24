'use client';

import { Controller } from 'react-hook-form';
import { FiActivity, FiDollarSign, FiClock, FiImage } from 'react-icons/fi';
import InputWithIcon from '../../InputWithIcon';
import { FaPeopleGroup } from 'react-icons/fa6';

export default function BasicInfoTab({ control, errors, watch }: any) {
  const imgValue = watch('img');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
      <div className="col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề Tour *</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <InputWithIcon
              icon={FiActivity}
              {...field}
              error={errors.title?.message}
              placeholder="Ví dụ: Khám phá đảo Bali 5 ngày 4 đêm"
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Giá (VNĐ) *</label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <InputWithIcon
              icon={FiDollarSign}
              type="number"
              {...field}
              error={errors.price?.message}
              placeholder="0"
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Hạn đăng ký</label>
        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <InputWithIcon
              icon={FiClock}
              type="date"
              {...field}
              error={errors.deadline?.message}
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Số người *</label>
        <Controller
          name="participants"
          control={control}
          render={({ field }) => (
            <InputWithIcon
              type="number"
              {...field}
              icon={FaPeopleGroup}
              error={errors.participants?.message}
              placeholder="0"
            />
          )}
        />
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Ảnh đại diện (URL) *</label>
        <Controller
          name="img"
          control={control}
          render={({ field }) => (
            <InputWithIcon
              icon={FiImage}
              type="url"
              {...field}
              error={errors.img?.message}
              placeholder="https://example.com/image.jpg"
            />
          )}
        />
        {imgValue && (
          <div className="mt-3 relative h-40 w-full rounded-lg overflow-hidden border border-gray-200">
            <img
              src={imgValue}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Error')}
            />
          </div>
        )}
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả ngắn</label>
        <Controller
          name="shortDescription"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Tóm tắt hấp dẫn về chuyến đi..."
            />
          )}
        />
      </div>
    </div>
  );
}
