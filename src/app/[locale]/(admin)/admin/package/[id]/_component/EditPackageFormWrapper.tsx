'use client';

import { notFound, useRouter } from 'next/navigation';
import { PackageFormData } from '@/libs/schemas/packageSchema';
import PackageForm from '@/components/admin/package/package-form/PackageForm';
import { Package } from '@/types/Package';

interface EditPackageFormWrapperProps {
  initialData: Package;
}

export default function EditPackageFormWrapper({ initialData }: EditPackageFormWrapperProps) {
  const router = useRouter();

  if (!initialData) {
    notFound();
  }

  const handleSubmit = async (data: PackageFormData) => {
    try {
      const response = await fetch(`/api/admin/package/${initialData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update package');
      }

      console.log('Package updated successfully');
      router.push('/admin/package');
    } catch (error) {
      console.error('Error updating package:', error);
     // CATCH HANDLE
    }
  };

  const handleCancel = () => {
    console.log('Edit cancelled');
    router.push('/admin/package');
  };

  return (
    <PackageForm
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEdit={true}
    />
  );
}
