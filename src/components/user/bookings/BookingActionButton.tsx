import React from 'react';

interface BookingActionButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function BookingActionButton({
  children,
  className,
  onClick
}: BookingActionButtonProps) {
  return (
    <button
      className={`text-sm border border-gray-300 rounded-full px-3 py-1.5 font-medium ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
