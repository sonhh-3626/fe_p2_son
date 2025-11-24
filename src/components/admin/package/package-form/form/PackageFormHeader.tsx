'use client';

import { FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function PackageFormHeader({ isEdit, onCancel }: any) {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) onCancel();
    router.back();
  };

  return (
    <div className="bg-gray-50 border-b px-8 py-5 flex items-center justify-between shrink-0">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Chỉnh sửa Package' : 'Tạo Package Mới'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Điền đầy đủ thông tin để hiển thị tour tốt nhất.
        </p>
      </div>

      <button
        type="button"
        onClick={handleCancel}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
      >
        <FiX size={24} />
      </button>
    </div>
  );
}
