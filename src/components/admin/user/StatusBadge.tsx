export default function StatusBadge({ status }: { status: string }) {
  const colors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    suspended: 'bg-red-100 text-red-700'
  };

  const labels = {
    active: 'Hoạt động',
    inactive: 'Không hoạt động',
    suspended: 'Đã khóa'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
}
