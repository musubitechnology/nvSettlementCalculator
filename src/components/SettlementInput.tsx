import React from 'react';
import { Settlement } from '../types';
import { AddItemButton } from './ui/AddItemButton';
import { DeleteButton } from './ui/DeleteButton';
import { CurrencyInput } from './ui/CurrencyInput';

interface Props {
  settlements: Settlement[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof Settlement, value: string | number) => void;
  total: number;
}

export default function SettlementInput({ settlements, onAdd, onRemove, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Gross Settlements</h3>
      </div>
      
      <div className="space-y-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 space-y-4">
          {settlements.map((settlement) => (
            <div key={settlement.id} className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Description"
                value={settlement.description}
                onChange={(e) => onChange(settlement.id, 'description', e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-md border border-gray-300 shadow-sm
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <div className="w-48">
                <CurrencyInput
                  value={settlement.amount}
                  onChange={(value) => onChange(settlement.id, 'amount', value)}
                  placeholder="Amount"
                />
              </div>
              <DeleteButton onClick={() => onRemove(settlement.id)} />
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <AddItemButton onClick={onAdd} label="Add Settlement" />
        </div>
      </div>
    </div>
  );
}