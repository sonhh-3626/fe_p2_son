'use client';

import { LuTrash2 } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

interface DeletePackageBtnProps {
  packageId: number;
  onDelete: (id: number) => void;
}

export default function DeletePackageBtn({ packageId, onDelete }: DeletePackageBtnProps) {
  const t = useTranslations('PackageTableRow');

  const handleDeleteClick = () => {
    if (window.confirm(t('confirmDelete'))) {
      onDelete(packageId);
    }
  };

  return (
    <button
      onClick={handleDeleteClick}
      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
      title={t('deletePackage')}
    >
      <LuTrash2 size={20} />
    </button>
  );
}
