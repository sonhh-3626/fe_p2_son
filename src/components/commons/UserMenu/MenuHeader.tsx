interface MenuHeaderProps {
  title: string;
}

export default function MenuHeader({
  title
}: MenuHeaderProps) {
  return (
    <div className="p-4 border-b">
      <h3 className="font-bold text-gray-800 mb-3">{title}</h3>
    </div>
  );
}
