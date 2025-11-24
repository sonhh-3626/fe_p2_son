'use client';

import { LuMapPin, LuUsers, LuCalendar } from 'react-icons/lu';
import PackageInfo from './PackageInfo';
import PriceDisplay from './PriceDisplay';
import RatingDisplay from './RatingDisplay';
import ActionButton from './ActionButton';
import { Package } from '../../../types/Package';
import { useTranslations } from 'next-intl';
import DeletePackageBtn from './DeletePackageBtn';

interface PackageTableRowProps {
  package: Package;
  onViewDetails: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PackageTableRow({ package: pkg, onViewDetails, onDelete }: PackageTableRowProps) {
  const t = useTranslations('PackageTableRow');

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <PackageInfo
          img={pkg.img}
          title={pkg.title}
          description={pkg.shortDescription}
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-gray-700">
          <LuMapPin className="w-4 h-4 text-gray-400" />
          {pkg.location}
        </div>
      </td>
      <td className="px-6 py-4">
        <PriceDisplay price={pkg.price} />
      </td>
      <td className="px-6 py-4">
        <RatingDisplay rating={pkg.rating} reviews={pkg.reviews} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-gray-700">
          <LuUsers className="w-4 h-4 text-gray-400" />
          {pkg.participants}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-gray-700">
          <LuCalendar className="w-4 h-4 text-gray-400" />
          {new Date(pkg.deadline).toLocaleDateString('vi-VN')}
        </div>
      </td>
      <td className="px-6 py-4 text-right flex gap-2 justify-end">
        <ActionButton onClick={() => onViewDetails(pkg.id)}>
          {t('viewDetails')}
        </ActionButton>
        <DeletePackageBtn packageId={pkg.id} onDelete={onDelete} />
      </td>
    </tr>
  );
}
