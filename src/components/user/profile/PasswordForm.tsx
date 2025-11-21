'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema, PasswordFormData } from '@/lib/types';
import { useChangePassword } from '@/hooks/useUserQuery';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTranslations } from 'next-intl';

export function PasswordForm() {
  const t = useTranslations('PasswordForm');
  const changePasswordMutation = useChangePassword();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    await changePasswordMutation.mutateAsync(data);
    reset();
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">{t('changePassword')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label={t('currentPassword')}
          type="password"
          {...register('currentPassword')}
          error={errors.currentPassword?.message}
          placeholder="••••••••"
        />

        <Input
          label={t('newPassword')}
          type="password"
          {...register('newPassword')}
          error={errors.newPassword?.message}
          placeholder="••••••••"
        />

        <Input
          label={t('confirmNewPassword')}
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          placeholder="••••••••"
        />

        {changePasswordMutation.isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {t('changePasswordSuccess')}
          </div>
        )}

        {changePasswordMutation.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {changePasswordMutation.error.message}
          </div>
        )}

        <Button
          type="submit"
          variant="secondary"
          isLoading={changePasswordMutation.isPending}
          className="w-full"
        >
          {t('changePassword')}
        </Button>
      </form>
    </Card>
  );
}
