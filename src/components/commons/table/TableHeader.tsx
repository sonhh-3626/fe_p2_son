import { useTranslations } from 'next-intl';

export default function TableHeader() {
  const t = useTranslations('PackageTableHeader');

  const headers = [
    { key: 'package', align: 'left' },
    { key: 'location', align: 'left' },
    { key: 'price', align: 'left' },
    { key: 'rating', align: 'left' },
    { key: 'participants', align: 'left' },
    { key: 'deadline', align: 'left' },
    { key: 'actions', align: 'right' },
  ];

  return (
    <thead className='bg-gray-50 border-b border-gray-200'>
      <tr>
        {headers.map((h) => (
          <th
            key={h.key}
            className={`px-6 py-4 text-${h.align} text-xs font-semibold text-gray-600 uppercase tracking-wider`}
          >
            {t(`${h.key}`)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
