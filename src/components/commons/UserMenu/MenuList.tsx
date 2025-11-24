import { FaBars } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { useTranslations } from 'next-intl';

interface MenuItemData {
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
  badgeColor?: string;
  path: string;
}

export default function MenuList() {
  const t = useTranslations('Header');

  const menuItems: MenuItemData[] = [
    {
      icon: <FaBars className="w-5 h-5" />,
      label: t('myBookings'),
      path: "/bookings"
    }
  ];

  return (
    <div>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
          badgeColor={item.badgeColor || ""}
          path={item.path}
        />
      ))}
    </div>
  );
}
