import PackageTableRow from './PackageTableRow';
import { Package } from '../../../types/Package';
import TableHeader from '@/components/commons/table/TableHeader';

interface PackageTableProps {
  packages: Package[];
  onViewDetails: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PackageTable({ packages, onViewDetails, onDelete }: PackageTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader />
          <tbody className="divide-y divide-gray-200">
            {packages.map((pkg) => (
              <PackageTableRow
                key={pkg.id}
                package={pkg}
                onViewDetails={onViewDetails}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
