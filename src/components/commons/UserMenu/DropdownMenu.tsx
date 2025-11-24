'use client';

import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import SignInButton from '@/components/auth/SigninButton';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';
import SettingsSection from './SettingsSection';

interface DropdownMenuProps {
  onClose?: () => void;
  session: Session | null;
}

export default function DropdownMenu({
  onClose = () => {},
  session
}: DropdownMenuProps) {
  const t = useTranslations('Header');

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl z-50 overflow-hidden">
      {session ? (
        <>
          <MenuHeader title={t('myAccount')} />
          <MenuList />
          <div className="p-4">
            <SignInButton />
          </div>
        </>
      ) : (
        <>
          <MenuHeader title={t('welcome')} />
          <div className="p-4">
            <SignInButton />
          </div>
        </>
      )}
      <SettingsSection />
    </div>
  );
}
