import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { SortDirection } from '../../../types/Package';

interface SortIconProps {
  direction: SortDirection;
}

export default function SortIcon({ direction }: SortIconProps) {
  if (direction === 'asc') {
    return <ChevronUp className="w-4 h-4" />;
  }
  if (direction === 'desc') {
    return <ChevronDown className="w-4 h-4" />;
  }
  return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
}
