'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface GenericPageDetailProps {
  title: string;
  description?: string;
  onAdd?: () => void;
  addButtonLabel?: string;
}

export default function GenericPageDetail({
  title,
  description,
  onAdd,
  addButtonLabel,
}: GenericPageDetailProps) {
  const t = useTranslations('GenericPageDetail');

  return (
    <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        {t('pageDetailTitle', { title })}
      </h2>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {description ?? t('defaultDescription', { titleLower: title.toLowerCase() })}
      </p>
      <div className="mt-6">
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
          disabled={!onAdd}
          aria-disabled={!onAdd}
          aria-label={t('addButtonAria', { title })}
        >
          {addButtonLabel || t('addButton')}
        </button>
      </div>
    </div>
  );
}
