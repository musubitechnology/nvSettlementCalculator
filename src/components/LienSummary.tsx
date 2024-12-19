import React from 'react';
import { formatCurrency } from '../utils/formatting';

interface Props {
  totalOriginal: number;
  totalNegotiated: number;
}

export function LienSummary({ totalOriginal, totalNegotiated }: Props) {
  const totalReduction = totalOriginal - totalNegotiated;
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Liens</h3>
      <div className="space-y-1 text-sm text-gray-600">
        <p>Original Total: {formatCurrency(totalOriginal)}</p>
        <p>Total Reduction: {formatCurrency(totalReduction)}</p>
        <p>Negotiated Total: {formatCurrency(totalNegotiated)}</p>
      </div>
    </div>
  );
}