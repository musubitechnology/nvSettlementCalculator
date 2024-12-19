import React from 'react';

interface Props {
  type: 'text' | 'number';
  value: string | number;
  onChange: (value: any) => void;
  placeholder: string;
}

export function LienInput({ type, value, onChange, placeholder }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = type === 'number' ? (parseFloat(e.target.value) || 0) : e.target.value;
    onChange(val);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value || ''}
      onChange={handleChange}
      className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                text-sm transition-colors duration-200"
    />
  );
}