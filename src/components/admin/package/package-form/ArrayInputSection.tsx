'use client';

import { useFieldArray, Controller } from 'react-hook-form';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function ArrayInputSection({ name, label, bgColor, borderColor, textColor, control }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className={`${bgColor} p-4 rounded-xl border ${borderColor}`}>
      <label className={`block text-sm font-bold ${textColor} mb-3`}>{label}</label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <Controller
            name={`${name}.${index}`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`flex-1 px-3 py-2 border ${borderColor.replace('border-', 'border-').replace('-100', '-200')} rounded-lg focus:ring-2 text-sm`}
              />
            )}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FiTrash2 />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append('')}
        className={`mt-2 flex items-center gap-1 text-sm font-medium ${textColor} hover:opacity-80`}
      >
        <FiPlus /> Thêm mục
      </button>
    </div>
  );
}
