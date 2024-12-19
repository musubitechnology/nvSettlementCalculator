import React from 'react';
import { Lien } from '../../types';
import { DeleteButton } from '../ui/DeleteButton';
import { LienDescription } from './LienDescription';
import { LienAmount } from './LienAmount';
import { LienPercentage } from './LienPercentage';
import { useLienCalculations } from '../../hooks/useLienCalculations';

interface Props {
  lien: Lien;
  onChange: (id: string, field: keyof Lien, value: string | number) => void;
  onRemove: (id: string) => void;
}

export default function LienRow({ lien, onChange, onRemove }: Props) {
  const {
    handleOriginalAmountChange,
    handleReductionAmountChange,
    handlePercentageChange,
    handleNegotiatedAmountChange
  } = useLienCalculations(lien, onChange);

  return (
    <div className="grid grid-cols-12 gap-3 items-center">
      <div className="col-span-3">
        <LienDescription
          value={lien.description}
          onChange={(value) => onChange(lien.id, 'description', value)}
        />
      </div>
      <div className="col-span-2">
        <LienAmount
          value={lien.originalAmount}
          onChange={handleOriginalAmountChange}
          placeholder="Original Amount"
        />
      </div>
      <div className="col-span-2">
        <LienAmount
          value={lien.reductionAmount || 0}
          onChange={handleReductionAmountChange}
          placeholder="Reduction Amount"
        />
      </div>
      <div className="col-span-2">
        <LienPercentage
          value={lien.reductionPercentage || 0}
          onChange={handlePercentageChange}
        />
      </div>
      <div className="col-span-2">
        <LienAmount
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