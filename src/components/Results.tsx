import React from 'react';
import { CalculationResult, Cost, Lien } from '../types';
import { ResultsHeader } from './ui/ResultsHeader';
import { ResultsSummary } from './ui/ResultsSummary';
import { ResultsExplanation } from './ui/ResultsExplanation';
import { SettlementLetter } from './SettlementLetter/SettlementLetter';
import { generateReportText } from '../utils/report';

interface Props {
  result: CalculationResult;
  costs: Cost[];
  liens: Lien[];
}

export default function Results({ result, costs, liens }: Props) {
  const handleCopyToClipboard = () => {
    const text = generateReportText(result);
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const text = generateReportText(result);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settlement-calculation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <ResultsHeader 
          onCopy={handleCopyToClipboard}
          onDownload={handleDownload}
          onPrint={() => window.print()}
        />
        <ResultsSummary result={result} />
      </div>
      <ResultsExplanation result={result} />
      <SettlementLetter result={result} costs={costs} liens={liens} />
    </div>
  );
}