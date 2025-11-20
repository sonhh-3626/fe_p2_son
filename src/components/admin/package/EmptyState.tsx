import { LuSearch } from "react-icons/lu";

export default function EmptyState() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
      <LuSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy kết quả</h3>
      <p className="text-gray-500">Vui lòng thử lại với từ khóa khác</p>
    </div>
  );
}
