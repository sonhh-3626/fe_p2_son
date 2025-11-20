import { LuMapPin, LuUsers, LuCalendar } from "react-icons/lu";
import PackageInfo from './PackageInfo';
import PriceDisplay from './PriceDisplay';
import RatingDisplay from './RatingDisplay';
import ActionButton from './ActionButton';
import { Package } from '../../../types/Package'; // Assuming Package type will be moved here

interface PackageTableRowProps {
  package: Package;
  onViewDetails: (id: number) => void;
}

export default function PackageTableRow({ package: pkg, onViewDetails }: PackageTableRowProps) {
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
      <td className="px-6 py-4 text-right">
        <ActionButton onClick={() => onViewDetails(pkg.id)}>
          Xem chi tiết
        </ActionButton>
      </td>
    </tr>
  );
}
