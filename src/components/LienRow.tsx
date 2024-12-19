import React from 'react';
import { Lien } from '../types';
import { DeleteButton } from './ui/DeleteButton';
import { useLienCalculations } from '../hooks/useLienCalculations';
import { CurrencyInput } from './ui/CurrencyInput';

interface Props {
  lien: Lien;
  onChange: (id: string, field: keyof Lien, value: string | number) => void;
  onRemove: (id: string) => void;
}

export function LienRow({ lien, onChange, onRemove }: Props) {
  const {
    handleOriginalAmountChange,
    handleReductionAmountChange,
    handlePercentageChange,
    handleNegotiatedAmountChange
  } = useLienCalculations(lien, onChange);

  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-3">
        <input
          type="text"
          placeholder="Description"
          value={lien.description}
          onChange={(e) => onChange(lien.id, 'description', e.target.value)}
          className="w-full px-3 py-1.5 rounded-md border border-gray-300 
                   focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
        />
      </div>
      <div className="col-span-2">
        <CurrencyInput
          value={lien.originalAmount}
          onChange={handleOriginalAmountChange}
          placeholder="Original Amount"
        />
      </div>
      <div className="col-span-2">
        <CurrencyInput
          value={lien.reductionAmount || 0}
          onChange={handleReductionAmountChange}
          placeholder="Reduction Amount"
        />
      </div>
      <div className="col-span-2">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="Reduction %"
            value={lien.reductionPercentage || ''}
            onChange={(e) => handlePercentageChange(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-1.5 rounded-md border border-gray-300 
                     focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <span className="text-gray-500 text-sm">%</span>
        </div>
      </div>
      <div className="col-span-2">
        <CurrencyInput
          value={lien.negotiatedAmount}
          onChange={handleNegotiatedAmountChange}
          placeholder="Negotiated Amount"
        />
      </div>
      <div className="col-span-1 flex justify-end">
        <DeleteButton onClick={() => onRemove(lien.id)} />
      </div>
    </div>
  );
}