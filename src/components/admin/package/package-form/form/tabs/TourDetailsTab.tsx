'use client';

import { Controller } from 'react-hook-form';
import { FiMapPin, FiClock } from 'react-icons/fi';
import InputWithIcon from '../../InputWithIcon';
import ArrayInputSection from '../../ArrayInputSection';

export default function TourDetailsTab({ control, errors }: any) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Điểm đến</label>
          <Controller
            name="destination"
            control={control}
            render={({ field }) => <InputWithIcon icon={FiMapPin} {...field} />}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Điểm khởi hành</label>
          <Controller
            name="departure"
            control={control}
            render={({ field }) => <InputWithIcon icon={FiMapPin} {...field} />}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Thời gian đi</label>
          <Controller
            name="departureTime"
            control={control}
            render={({ field }) => <InputWithIcon icon={FiClock} {...field} placeholder="08:00 AM" />}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Thời gian về</label>
          <Controller
            name="returnTime"
            control={control}
            render={({ field }) => <InputWithIcon icon={FiClock} {...field} placeholder="18:00 PM" />}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Dress Code</label>
          <Controller
            name="dressCode"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            )}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả chi tiết</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={5}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArrayInputSection
          name="included"
          label="Bao gồm (Included)"
          bgColor="bg-green-50"
          borderColor="border-green-100"
          textColor="text-green-800"
          control={control}
        />
        <ArrayInputSection
          name="notIncluded"
          label="Không bao gồm (Not Included)"
          bgColor="bg-red-50"
          borderColor="border-red-100"
          textColor="text-red-800"
          control={control}
        />
      </div>
    </div>
  );
}
