import { useRouter, usePathname } from 'next/navigation';
import { MdClose } from 'react-icons/md';
import { ADMIN_PAGE_TABS } from '@/constants/adminPages';
import AdminLogoutButton from '@/components/admin/layout/AdminLogoutButton';
import Logo from '@/components/commons/Logo';

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  onOpenLogoutModal: () => void;
}


export default function AdminSidebar({
  isSidebarOpen,
  closeSidebar,
  onOpenLogoutModal
}: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (href: string) => {
    router.push(href);
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform duration-300 z-50
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}
    >
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
        aria-label="Đóng Menu"
      >
        <MdClose className="w-6 h-6" />
      </button>

      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <Logo color='white' />
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {ADMIN_PAGE_TABS.map((item) => (
          <button
            key={item.id}
            onClick={() => navigateTo(item.path)}
            className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 text-left
              ${pathname.includes(item.path)
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }
            `}
          >
            {<item.icon className="w-5 h-5 mr-3" />}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center p-3 mb-2 rounded-lg text-lg font-semibold text-gray-300">
          <span>Setting</span>
        </div>
        <div className="space-y-1 text-sm">
          <AdminLogoutButton onOpenModal={onOpenLogoutModal} />
        </div>
      </div>
    </div>
  );
};
