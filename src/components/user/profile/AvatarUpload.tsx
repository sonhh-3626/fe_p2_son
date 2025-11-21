'use client';

import { useState, useRef } from 'react';
import { useUpdateAvatar } from '@/hooks/useUserQuery';
import { Button } from '@/components/ui/Button';
import { compressImage, validateImage } from '@/utils/imageUtils';
import AvatarLoadingOverlay from './AvatarLoadingOverlay';
import { LuCloudUpload } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

interface AvatarUploadProps {
  currentAvatar?: string;
  username: string;
}

export function AvatarUpload({ currentAvatar, username }: AvatarUploadProps) {
  const t = useTranslations('AvatarUpload'); // namespace i18n
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateAvatarMutation = useUpdateAvatar();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.error!);
      return;
    }

    try {
      const compressedBase64 = await compressImage(file);
      setPreview(compressedBase64);

      await updateAvatarMutation.mutateAsync(compressedBase64);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('genericError'));
      setPreview(currentAvatar || null);
    }
  };

  const getInitials = () => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          {preview ? (
            <img
              src={preview}
              alt={username}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{getInitials()}</span>
          )}
        </div>

        {updateAvatarMutation.isPending && <AvatarLoadingOverlay />}
      </div>

      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          disabled={updateAvatarMutation.isPending}
          className="text-sm"
        >
          <LuCloudUpload />
          <span className="pl-2">{t('uploadButton')}</span>
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      {updateAvatarMutation.isSuccess && (
        <p className="text-sm text-green-600 text-center">
          {t('successMessage')}
        </p>
      )}

      <p className="text-xs text-gray-500 text-center">
        {t('fileGuidelines')}
      </p>
    </div>
  );
}
