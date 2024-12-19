import React from 'react';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export function LienPercentage({ value, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow empty input or decimal numbers
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      const numValue = parseFloat(inputValue) || 0;
      // Ensure value is between 0 and 100
      if (numValue >= 0 && numValue <= 100) {
        onChange(numValue);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        inputMode="decimal"
        min="0"
        max="100"
        placeholder="Reduction %"
        value={value || ''}
        onChange={handleChange}
        className="w-full px-3 py-1.5 rounded-md border border-gray-300 
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
      />
      <span className="text-gray-500 text-sm">%</span>
    </div>
  );
}