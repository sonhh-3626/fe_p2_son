export default function RoleBadge({ role }: { role: string }) {
  const colors = {
    admin: 'bg-purple-100 text-purple-700',
    user: 'bg-gray-100 text-gray-700'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[role as keyof typeof colors]}`}>
      {role}
    </span>
  );
}
