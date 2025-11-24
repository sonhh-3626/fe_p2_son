'use client';

import { Card } from '@/components/ui/Card';
import { AvatarUpload } from '@/components/user/profile/AvatarUpload';
import { BankAccountList } from '@/components/user/profile/bank_account/BankAccountList';
import { PasswordForm } from '@/components/user/profile/PasswordForm';
import { ProfileForm } from '@/components/user/profile/ProfileForm';
import { useUserProfile } from '@/hooks/useUserQuery';
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const { data: user, isLoading, isError, error } = useUserProfile();
  const t = useTranslations('ProfilePage');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <p className="font-medium">{t('error')}: {error?.message || t('userNotFound')}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm underline"
          >
            {t('tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">{t('yourProfile')}</h1>

        <Card>
          <AvatarUpload
            currentAvatar={user.avatar}
            username={user.username}
          />
        </Card>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <ProfileForm user={user} />
          <PasswordForm />
        </div>

        <BankAccountList />
      </div>
    </div>
  );
}
