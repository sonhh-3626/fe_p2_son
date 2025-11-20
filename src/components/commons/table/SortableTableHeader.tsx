import SortIcon from './SortIcon';
import { TableColumn, SortConfig, SortDirection } from '../../../types/Package';

interface SortableTableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

export default function SortableTableHeader<T>({
  columns,
  sortConfig,
  onSort,
}: SortableTableHeaderProps<T>) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {columns.map((column) => {
          const align = column.headerAlign || 'left';
          const isActive = sortConfig.key === column.key;

          return (
            <th
              key={column.key}
              className={`px-6 py-4 text-${align} text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                column.sortable ? 'cursor-pointer select-none hover:bg-gray-100 transition-colors' : ''
              }`}
              onClick={() => column.sortable && onSort(column.key)}
              style={{ width: column.width }}
            >
              <div className={`flex items-center gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
                <span>{column.label}</span>
                {column.sortable && (
                  <SortIcon direction={isActive ? sortConfig.direction : null} />
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
