'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { profileSchema, ProfileFormData } from '@/lib/types';
import { User } from '@/types/User';
import { useUpdateProfile } from '@/hooks/useUserQuery';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTranslations } from 'next-intl';

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const t = useTranslations('ProfileForm');
  const updateProfileMutation = useUpdateProfile();

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  useEffect(() => {
    reset({
      username: user.username,
      email: user.email,
    });
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfileMutation.mutateAsync(data);
    } catch (error) {
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">{t('personalInformation')}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label={t('username')}
          {...register('username')}
          error={errors.username?.message}
          placeholder={t('usernamePlaceholder')}
        />

        <Input
          label={t('email')}
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder={t('emailPlaceholder')}
        />

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{t('role')}:</span>
            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {user.role}
            </span>
          </p>
        </div>

        {updateProfileMutation.isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            ✓ {t('updateSuccess')}
          </div>
        )}

        {updateProfileMutation.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {updateProfileMutation.error.message}
          </div>
        )}

        <Button
          type="submit"
          isLoading={updateProfileMutation.isPending}
          disabled={!isDirty}
          className="w-full"
        >
          {t('updateButton')}
        </Button>
      </form>
    </Card>
  );
}
