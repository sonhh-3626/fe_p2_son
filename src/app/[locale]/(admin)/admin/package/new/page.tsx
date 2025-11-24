'use client';

import { useRouter } from 'next/navigation';
import PackageForm from '@/components/admin/package/package-form/PackageForm';
import { PackageFormData } from '@/libs/schemas/packageSchema';

export default function NewPackagePage() {
  const router = useRouter();

  const handleSubmit = async (data: PackageFormData) => {
    try {
      const response = await fetch('/api/admin/package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create package');
      }

      console.log('New package created successfully');
      router.push('/admin/package');
    } catch (error) {
      console.error('Error creating new package:', error);
     // CATCH HANDLE
    }
  };

  const handleCancel = () => {
    console.log('New package creation cancelled');
    router.push('/admin/package');
  };

  return (
    <PackageForm
      initialData={null}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEdit={false}
    />
  );
}
