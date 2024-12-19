import React from 'react';
import { Lien } from '../types';
import { LienRow } from './LienRow';

interface Props {
  liens: Lien[];
  onChange: (id: string, field: keyof Lien, value: string | number) => void;
  onRemove: (id: string) => void;
}

export function LienList({ liens, onChange, onRemove }: Props) {
  return (
    <div className="divide-y divide-gray-100">
      {liens.map((lien) => (
        <div key={lien.id} className="px-4 py-3">
          <LienRow
            lien={lien}
            onChange={onChange}
            onRemove={onRemove}
          />
        </div>
      ))}
    </div>
  );
}