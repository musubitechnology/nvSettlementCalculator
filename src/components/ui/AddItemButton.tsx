import React from 'react';
import { PlusCircle } from 'lucide-react';

interface Props {
  onClick: () => void;
  label: string;
}

export function AddItemButton({ onClick, label }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
    >
      <PlusCircle size={20} />
      {label}
    </button>
  );
}