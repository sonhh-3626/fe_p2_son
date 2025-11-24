'use client';

import { useFieldArray } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import PackagePlanCard from '../../PackagePlanCard';

export default function ItineraryTab({ control, errors }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'packagePlans',
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {fields.length === 0 && (
        <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p>Chưa có lịch trình nào.</p>
          <button
            type="button"
            onClick={() => append({ day: 1, title: '', description: '', activities: [''] })}
            className="mt-2 text-blue-600 hover:underline"
          >
            Thêm ngày đầu tiên ngay
          </button>
        </div>
      )}

      {fields.map((field, planIndex) => (
        <PackagePlanCard
          key={field.id}
          planIndex={planIndex}
          control={control}
          remove={remove}
          errors={errors}
        />
      ))}

      <button
        type="button"
        onClick={() => append({ day: fields.length + 1, title: '', description: '', activities: [''] })}
        className="w-full py-3 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 font-medium flex items-center justify-center gap-2 transition-colors"
      >
        <FiPlus size={20} /> Thêm ngày lịch trình mới
      </button>
    </div>
  );
}
