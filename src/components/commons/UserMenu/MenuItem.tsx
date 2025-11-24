import React from 'react';
import { useRouter } from 'next/navigation';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
  badgeColor?: string;
  path?: string;
  onClick?: () => void;
}

export default function MenuItem({ icon, label, badge, badgeColor, path, onClick }: MenuItemProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      router.push(path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-gray-600">{icon}</div>}
        <span className="text-sm text-gray-800">{label}</span>
      </div>

      {badge && (
        <span className={`${badgeColor || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full font-medium`}>
          {badge}
        </span>
      )}
    </button>
  );
}
