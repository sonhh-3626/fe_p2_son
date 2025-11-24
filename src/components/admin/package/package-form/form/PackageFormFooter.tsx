import { FiSave } from "react-icons/fi";

export default function PackageFormFooter({ onCancel, isEdit }: any) {
  return (
    <div className="bg-gray-50 border-t px-8 py-5 flex justify-end gap-4 shrink-0">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
      >
        Hủy bỏ
      </button>

      <button
        type="submit"
        className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
      >
        <FiSave size={18} />
        {isEdit ? 'Lưu thay đổi' : 'Tạo Package'}
      </button>
    </div>
  );
}
