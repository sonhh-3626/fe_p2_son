import SortableTableHeader from './SortableTableHeader';
import { TableColumn, SortConfig } from '../../../types/Package';

interface DataTableProps<T extends { id: number }> {
  columns: TableColumn<T>[];
  data: T[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

export default function DataTable<T extends { id: number }>({
  columns,
  data,
  sortConfig,
  onSort,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <SortableTableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} />
          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => {
                  const align = column.cellAlign || column.headerAlign || 'left';
                  return (
                    <td key={column.key} className={`px-6 py-4 text-${align}`}>
                      {column.render(item)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
