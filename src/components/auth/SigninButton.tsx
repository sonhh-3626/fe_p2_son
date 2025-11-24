'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function SignInButton() {
  const t = useTranslations('Login');
  const { data: session } = useSession();
  const router = useRouter();

  const commonButtonClasses = "ml-5 flex items-center gap-2 text-white px-4 py-2 rounded-lg";

  if (session?.user) {
    return (
      <button
        onClick={() => signOut()}
        className={`${commonButtonClasses} bg-red-400 hover:bg-red-400`}
      >
        {t('logoutBtn')}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => router.push('/login')}
        className={`${commonButtonClasses} bg-gray-500 hover:bg-gray-600`}
      >
        <span>{t('loginBtn')}</span>
      </button>
      <button
        onClick={() => router.push('/register')}
        className={`${commonButtonClasses} bg-blue-500 hover:bg-blue-600`}
      >
        <span>{t('registerBtn')}</span>
      </button>
    </div>
  );
}
