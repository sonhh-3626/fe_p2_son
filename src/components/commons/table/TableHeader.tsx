
export default function TableHeader() {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Package
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Địa điểm
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Giá
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Đánh giá
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Người tham gia
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Deadline
        </th>
        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Thao tác
        </th>
      </tr>
    </thead>
  );
}
