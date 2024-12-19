import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function LienDescription({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Description"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-1.5 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
    />
  );
}