'use client';

import { useFieldArray, Controller } from 'react-hook-form';
import { FiPlus, FiMapPin } from 'react-icons/fi';
import ImageUploadCard from '../../ImageUploadCard';
import InputWithIcon from '../../InputWithIcon';

export default function ImagesMapTab({ control, watch }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-700">Thư viện ảnh (Gallery)</label>
          <button
            type="button"
            onClick={() => append('')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            <FiPlus /> Thêm ảnh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <ImageUploadCard
              key={field.id}
              index={index}
              control={control}
              remove={remove}
              watch={watch}
            />
          ))}

          {fields.length === 0 && (
            <div className="col-span-full text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-400">
              Chưa có ảnh nào trong thư viện.
            </div>
          )}
        </div>
      </div>

      <hr />

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Địa điểm cụ thể</label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => <InputWithIcon icon={FiMapPin} {...field} />}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Google Maps Embed URL</label>
          <Controller
            name="mapUrl"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm text-gray-600"
              />
            )}
          />
          <p className="text-xs text-gray-400 mt-1">Vào Google Maps → Chia sẻ → Nhúng bản đồ → Copy link trong src.</p>
        </div>
      </div>
    </div>
  );
}
