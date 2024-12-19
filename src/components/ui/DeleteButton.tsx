import React from 'react';
import { Trash2 } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export function DeleteButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="text-red-500 hover:text-red-600"
    >
      <Trash2 size={20} />
    </button>
  );
}