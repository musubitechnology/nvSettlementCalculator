import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatting';

interface Props {
  feePercentage: number;
  onChange: (value: number) => void;
  grossSettlement: number;
}

export default function AttorneyFeeInput({ feePercentage, onChange, grossSettlement }: Props) {
  const [feeType, setFeeType] = useState<'percentage' | 'flat'>('percentage');
  const [flatFeeAmount, setFlatFeeAmount] = useState(0);

  const handleFeeTypeChange = (type: 'percentage' | 'flat') => {
    setFeeType(type);
    if (type === 'flat') {
      onChange(0); // Reset percentage when switching to flat fee
    } else {
      setFlatFeeAmount(0); // Reset flat fee when switching to percentage
      onChange(33.3); // Default percentage
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Total Gross Settlement:</span>
        <span className="text-gray-900">{formatCurrency(grossSettlement)}</span>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Attorney Fee</h3>
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => handleFeeTypeChange('percentage')}
            className={`px-4 py-2 rounded-md ${
              feeType === 'percentage'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Percentage
          </button>
          <button
            onClick={() => handleFeeTypeChange('flat')}
            className={`px-4 py-2 rounded-md ${
              feeType === 'flat'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Flat Fee
          </button>
        </div>

        {feeType === 'percentage' ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={feePercentage}
              onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
              className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-600">%</span>
            <span className="ml-4 text-gray-600">
              = {formatCurrency((grossSettlement * feePercentage) / 100)}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              value={flatFeeAmount}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setFlatFeeAmount(value);
                // Calculate equivalent percentage
                const percentage = grossSettlement > 0 ? (value / grossSettlement) * 100 : 0;
                onChange(percentage);
              }}
              className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-600">
              ({((flatFeeAmount / grossSettlement) * 100).toFixed(1)}% of gross)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}