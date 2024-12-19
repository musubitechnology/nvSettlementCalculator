import React from 'react';
import { CalculationResult, Cost, Lien } from '../../types';
import { LetterHeader } from './LetterHeader';
import { LetterBody } from './LetterBody';
import { LetterFooter } from './LetterFooter';
import { CopyLetterButton } from '../ui/CopyLetterButton';
import { formatLetter } from '../../utils/letterFormatting';

interface Props {
  result: CalculationResult;
  costs: Cost[];
  liens: Lien[];
  firmInfo?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    attorney: string;
  };
  clientInfo?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

export function SettlementLetter({ result, costs, liens, firmInfo, clientInfo }: Props) {
  const handleCopy = () => {
    const formattedLetter = formatLetter(result, costs, liens);
    navigator.clipboard.writeText(formattedLetter);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Settlement Letter</h2>
        <CopyLetterButton onClick={handleCopy} />
      </div>
      <div className="settlement-letter-content font-serif whitespace-pre-wrap">
        <LetterHeader firmInfo={firmInfo} clientInfo={clientInfo} />
        <LetterBody result={result} costs={costs} liens={liens} />
        <LetterFooter firmInfo={firmInfo} />
      </div>
    </div>
  );
}