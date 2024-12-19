import React from 'react';
import { formatCurrency } from '../../utils/formatting';

interface Props {
  number: number;
  label: string;
  value: number;
  color: 'blue' | 'red' | 'orange' | 'green';
}

export function ExplanationStep({ number, label, value, color }: Props) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    orange: 'bg-orange-100 text-orange-600',
    green: 'bg-green-100 text-green-600'
  };

  return (
    <div className="flex items-center gap-4">
      <div className={`w-8 h-8 rounded-full ${colorClasses[color]} flex items-center justify-center font-bold`}>
        {number}
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className={`text-lg font-bold ${color === 'green' ? 'text-green-600' : `text-${color}-600`}`}>
          {formatCurrency(value)}
        </p>
      </div>
    </div>
  );
}