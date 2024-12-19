import React from 'react';
import { useCurrencyInput } from '../../hooks/useCurrencyInput';

interface Props {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
}

export function CurrencyInput({ value, onChange, placeholder, className = '' }: Props) {
  const { displayValue, handleChange } = useCurrencyInput(value, onChange);

  return (
    <input
      type="text"
      inputMode="decimal"
      placeholder={placeholder}
      value={displayValue}
      onChange={(e) => handleChange(e.target.value)}
      className={`w-full px-3 py-1.5 rounded-md border border-gray-300 
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                 text-sm ${className}`}
    />
  );
}