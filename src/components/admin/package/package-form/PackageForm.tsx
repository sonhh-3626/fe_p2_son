'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { packageSchema, PackageFormData } from '@/libs/schemas/packageSchema';
import PackageFormHeader from './form/PackageFormHeader';
import PackageFormTabs from './form/PackageFormTabs';
import PackageFormBody from './form/PackageFormBody';
import PackageFormFooter from './form/PackageFormFooter';

export default function PackageForm({ initialData, onSubmit, onCancel, isEdit = false }: any) {
  const [activeTab, setActiveTab] = useState(0);

  const defaultValues: PackageFormData = {
    title: initialData?.title ?? '',
    price: initialData?.price ?? 0,
    rating: initialData?.rating ?? 0,
    reviews: initialData?.reviews ?? 0,
    participants: initialData?.participants ?? 1,
    deadline: initialData?.deadline ?? '',
    shortDescription: initialData?.shortDescription ?? '',
    img: initialData?.img ?? '',
    destination: initialData?.destination ?? '',
    departure: initialData?.departure ?? '',
    departureTime: initialData?.departureTime ?? '',
    returnTime: initialData?.returnTime ?? '',
    dressCode: initialData?.dressCode ?? '',
    description: initialData?.description ?? '',
    included: initialData?.included ?? [],
    notIncluded: initialData?.notIncluded ?? [],
    packagePlans: initialData?.packagePlans ?? [],
    images: initialData?.images ?? [],
    location: initialData?.location ?? '',
    mapUrl: initialData?.mapUrl ?? '',
  };

  const { control, handleSubmit, formState: { errors }, watch } = useForm<PackageFormData>({
    resolver: zodResolver(packageSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white flex flex-col">

      <PackageFormHeader isEdit={isEdit} onCancel={onCancel} />

      <PackageFormTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <PackageFormBody
        activeTab={activeTab}
        control={control}
        errors={errors}
        watch={watch}
      />

      <PackageFormFooter onCancel={onCancel} isEdit={isEdit} />

    </form>
  );
}
