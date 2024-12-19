import React from 'react';
import { CalculationResult } from '../../types';
import { ExplanationStep } from './ExplanationStep';
import { formatCurrency } from '../../utils/formatting';

interface Props {
  result: CalculationResult;
}

export function ResultsExplanation({ result }: Props) {
  const totalReduction = result.originalLiens - result.negotiatedLiens;
  const reductionPercentage = result.originalLiens > 0 
    ? ((totalReduction / result.originalLiens) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Total Case Explanation</h3>
      <div className="space-y-4">
        <ExplanationStep
          number={1}
          label="Starting with gross settlement amount"
          value={result.grossSettlement}
          color="blue"
        />
        <ExplanationStep
          number={2}
          label={`Subtracting attorney fees (${result.feePercentage}%)`}
          value={-result.attorneyFees}
          color="red"
        />
        <ExplanationStep
          number={3}
          label="Subtracting case costs"
          value={-result.totalCosts}
          color="red"
        />
        <ExplanationStep
          number={4}
          label={`Subtracting negotiated liens (after ${formatCurrency(totalReduction)} or ${reductionPercentage}% reduction)`}
          value={-result.negotiatedLiens}
          color="red"
        />
        <ExplanationStep
          number={5}
          label="Final client net recovery"
          value={result.clientNet}
          color="green"
        />
      </div>
    </div>
  );
}