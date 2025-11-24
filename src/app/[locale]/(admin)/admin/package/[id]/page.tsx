import { notFound } from 'next/navigation';
import { fetchPackageData } from '@/libs/api/packages';
import EditPackageFormWrapper from './_component/EditPackageFormWrapper';

export default async function EditPackagePage({ params }: { params: { id: string } }) {
  const id = (await params).id;

  if (!id) {
    notFound();
  }

  const initialData = await fetchPackageData(id);

  if (!initialData) {
    notFound();
  }

  return <EditPackageFormWrapper initialData={initialData} />;
}
