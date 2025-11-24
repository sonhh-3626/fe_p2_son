import React from 'react';

interface InputWithIconProps {
  icon: React.ElementType | React.ReactNode;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  type?: string;
  error?: string;
  [key: string]: any;
}

export default function InputWithIcon({
  icon,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  ...props
}: InputWithIconProps) {
  const isIconComponent = typeof icon === 'function';

  const inputValue = value !== undefined && value !== null ? String(value) : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const processedValue = type === "number" ? Number(raw) : raw;

    onChange?.(processedValue);
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {isIconComponent
            ? React.createElement(icon as React.ElementType, { size: 18 })
            : icon}
        </div>

        <input
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all text-gray-800
            ${error ? 'border-red-500' : 'border-gray-300'}`}
          {...props}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
