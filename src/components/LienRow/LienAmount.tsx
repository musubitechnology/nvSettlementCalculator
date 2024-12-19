import React from 'react';
import { CurrencyInput } from '../ui/CurrencyInput';

interface Props {
  value: number;
  onChange: (value: number) => void;
  placeholder: string;
}

export function LienAmount({ value, onChange, placeholder }: Props) {
  return (
    <CurrencyInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full"
    />
  );
}