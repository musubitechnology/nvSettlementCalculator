import React from 'react';

interface Props {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export function AmountInput({ value, onChange, placeholder = "Amount" }: Props) {
  return (
    <input
      type="number"
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  );
}