import React from 'react';
import { Cost } from '../types';
import { PlusCircle, Trash2 } from 'lucide-react';
import { CurrencyInput } from './ui/CurrencyInput';
import { formatCurrency } from '../utils/formatting';
import { AddItemButton } from './ui/AddItemButton';

interface Props {
  costs: Cost[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof Cost, value: string | number) => void;
  total: number;
}

export default function CostsInput({ costs, onAdd, onRemove, onChange, total }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Case Costs</h3>
        <p className="text-sm text-gray-600">Total: {formatCurrency(total)}</p>
      </div>
      
      <div className="space-y-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 space-y-4">
          {costs.map((cost) => (
            <div key={cost.id} className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Description"
                value={cost.description}
                onChange={(e) => onChange(cost.id, 'description', e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-md border border-gray-300 shadow-sm
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <div className="w-48">
                <CurrencyInput
                  value={cost.amount}
                  onChange={(value) => onChange(cost.id, 'amount', value)}
                  placeholder="Amount"
                />
              </div>
              <button
                onClick={() => onRemove(cost.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <AddItemButton onClick={onAdd} label="Add Cost" />
        </div>
      </div>
    </div>
  );
}