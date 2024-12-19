import React from 'react';
import { CalculationResult } from '../../types';
import { formatCurrency } from '../../utils/formatting';
import { calculateReductionPercentage, calculateAverageReduction } from '../../utils/calculations';

interface Props {
  result: CalculationResult;
}

export function ResultsSummary({ result }: Props) {
  const reductionPercentage = calculateReductionPercentage(result.originalLiens, result.negotiatedLiens);
  const averageReduction = calculateAverageReduction(result.originalLiens, result.negotiatedLiens);

  return (
    <div className="grid grid-cols-2 gap-4">
      <ResultItem 
        label="Gross Settlement"
        value={formatCurrency(result.grossSettlement)}
      />
      <ResultItem 
        label={`Attorney Fees (${result.feePercentage}%)`}
        value={formatCurrency(result.attorneyFees)}
      />
      <ResultItem 
        label="Total Costs"
        value={formatCurrency(result.totalCosts)}
      />
      <ResultItem 
        label="Original Liens"
        value={formatCurrency(result.originalLiens)}
      />
      <ResultItem 
        label="Negotiated Liens"
        value={formatCurrency(result.negotiatedLiens)}
      />
      <ResultItem 
        label="Total Reduction"
        valueContent={
          <>
            <span>{formatCurrency(result.originalLiens - result.negotiatedLiens)}</span>
            <span className="text-sm text-green-600 font-medium ml-2">
              (avg {averageReduction.toFixed(1)}% per lien)
            </span>
          </>
        }
      />
      <ResultItem 
        label="Client Net"
        value={formatCurrency(result.clientNet)}
        highlight
      />
    </div>
  );
}

interface ResultItemProps {
  label: string;
  value?: string;
  valueContent?: React.ReactNode;
  highlight?: boolean;
}

function ResultItem({ label, value, valueContent, highlight }: ResultItemProps) {
  return (
    <div className="space-y-2">
      <p className="text-gray-600">{label}</p>
      {valueContent ? (
        <div className={`text-2xl font-bold ${highlight ? 'text-green-600' : ''} flex items-baseline`}>
          {valueContent}
        </div>
      ) : (
        <p className={`text-2xl font-bold ${highlight ? 'text-green-600' : ''}`}>
          {value}
        </p>
      )}
    </div>
  );
}