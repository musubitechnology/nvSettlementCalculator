import { CalculationResult } from '../types';
import { formatCurrency } from './formatting';
import { calculateReductionPercentage } from './calculations';

export const generateSummary = (result: CalculationResult): string => {
  const reductionPercentage = calculateReductionPercentage(
    result.originalLiens,
    result.negotiatedLiens
  );

  return [
    'Personal Injury Settlement Calculation',
    '',
    'Summary:',
    `Gross Settlement: ${formatCurrency(result.grossSettlement)}`,
    `Attorney Fees (${result.feePercentage}%): ${formatCurrency(result.attorneyFees)}`,
    `Total Costs: ${formatCurrency(result.totalCosts)}`,
    `Original Liens: ${formatCurrency(result.originalLiens)}`,
    `Negotiated Liens: ${formatCurrency(result.negotiatedLiens)} (${reductionPercentage.toFixed(1)}% reduction)`,
    `Client Net: ${formatCurrency(result.clientNet)}`
  ].join('\n');
};

export const generateDetailedExplanation = (result: CalculationResult): string => {
  const reductionPercentage = calculateReductionPercentage(
    result.originalLiens,
    result.negotiatedLiens
  );

  return [
    '',
    'Detailed Explanation:',
    `1. Starting with gross settlement amount: ${formatCurrency(result.grossSettlement)}`,
    `2. Subtracting attorney fees (${result.feePercentage}%): -${formatCurrency(result.attorneyFees)}`,
    `3. Subtracting case costs: -${formatCurrency(result.totalCosts)}`,
    `4. Original liens: ${formatCurrency(result.originalLiens)}`,
    `5. Negotiated liens (${reductionPercentage.toFixed(1)}% reduction): -${formatCurrency(result.negotiatedLiens)}`,
    `6. Final client net recovery: ${formatCurrency(result.clientNet)}`,
    '',
    `Generated on ${new Date().toLocaleDateString()}`
  ].join('\n');
};

export const generateReportText = (result: CalculationResult): string => {
  return [
    generateSummary(result),
    generateDetailedExplanation(result)
  ].join('\n');
};