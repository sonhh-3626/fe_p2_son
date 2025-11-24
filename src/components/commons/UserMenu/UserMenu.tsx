import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Backdrop from './Backdrop';
import DropdownMenu from './DropdownMenu';
import UserAvatar from './UserAvatar';
import MenuToggleButton from './MenuToggleButton';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const t = useTranslations('Header');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative inline-block">
      {session ? (
        <UserAvatar
          name={session?.user?.name || t('guest')}
          onClick={toggleMenu}
          isOpen={isOpen}
          session={session}
        />
      ) : (
        <MenuToggleButton onClick={toggleMenu} isOpen={isOpen} />
      )}

      {isOpen && (
        <>
          <DropdownMenu onClose={closeMenu} session={session} />
          <Backdrop onClick={closeMenu} />
        </>
      )}
    </div>
  );
}
