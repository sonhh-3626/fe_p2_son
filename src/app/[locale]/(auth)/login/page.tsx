'use client';

import { useSearchParams } from 'next/navigation';
import LoginForm from '../../../../components/auth/login/LoginForm';

export default function LoginPage() {
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '/';

  return (
    <LoginForm callbackUrl={callbackUrl} />
  );
}
