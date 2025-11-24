'use client';

import { useFieldArray, Controller } from 'react-hook-form';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';

export default function PackagePlanCard({ planIndex, control, remove, errors }: any) {
  const { fields: activityFields, append, remove: removeActivity } = useFieldArray({
    control,
    name: `packagePlans.${planIndex}.activities`,
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            Ngày {planIndex + 1}
          </span>
          <Controller
            name={`packagePlans.${planIndex}.title`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Tiêu đề ngày (VD: Khám phá phố cổ)"
                className="bg-transparent border-none focus:ring-0 text-gray-800 font-semibold text-sm w-64 placeholder-gray-400"
              />
            )}
          />
        </div>
        <button
          type="button"
          onClick={() => remove(planIndex)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Mô tả ngày</label>
          <Controller
            name={`packagePlans.${planIndex}.description`}
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={2}
                className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Mô tả tổng quan các hoạt động trong ngày..."
              />
            )}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
            Danh sách hoạt động
          </label>
          <div className="space-y-2 pl-3 border-l-2 border-gray-100">
            {activityFields.map((activity, actIndex) => (
              <div key={activity.id} className="flex items-center gap-2 group">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                <Controller
                  name={`packagePlans.${planIndex}.activities.${actIndex}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                      placeholder="Nhập hoạt động..."
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => removeActivity(actIndex)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:bg-red-50 rounded transition-all"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append('')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mt-2 ml-2"
            >
              <FiPlus size={16} /> Thêm hoạt động
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
