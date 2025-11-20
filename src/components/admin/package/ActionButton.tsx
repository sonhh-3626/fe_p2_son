import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function ActionButton({ onClick, children, variant = 'primary' }: ActionButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg transition-colors text-sm font-medium";
  const variantClasses = variant === 'primary'
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </button>
  );
}
