import React from 'react';
import { Lien } from '../types';
import { AddItemButton } from './ui/AddItemButton';
import { LienHeader } from './LienHeader';
import { LienList } from './LienList';
import { LienSummary } from './LienSummary';

interface Props {
  liens: Lien[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof Lien, value: string | number) => void;
  totalOriginal: number;
  totalNegotiated: number;
}

export default function LiensInput({ 
  liens, 
  onAdd, 
  onRemove, 
  onChange,
  totalOriginal,
  totalNegotiated 
}: Props) {
  return (
    <div className="space-y-6">
      <LienSummary
        totalOriginal={totalOriginal}
        totalNegotiated={totalNegotiated}
      />

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <LienHeader />
        <LienList
          liens={liens}
          onChange={onChange}
          onRemove={onRemove}
        />
        <div className="p-4 border-t border-gray-200">
          <AddItemButton onClick={onAdd} label="Add Lien" />
        </div>
      </div>
    </div>
  );
}