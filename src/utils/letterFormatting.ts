import { CalculationResult, Cost, Lien } from '../types';
import { formatCurrency } from './formatting';

export function formatLetter(result: CalculationResult, costs: Cost[], liens: Lien[]): string {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const totalReduction = result.originalLiens - result.negotiatedLiens;

  const sections = [
    '[Your Law Firm Name]',
    '[Address]',
    '[City, State, ZIP Code]',
    today,
    '[Client Name]',
    '[Client Address]',
    '[City, State, ZIP Code]',
    'Subject: Summary of Net Recovery from Settlement',
    'Dear [Client Name],',
    'I hope this letter finds you well. I am writing to provide you with a detailed summary of your net recovery following the resolution of your personal injury claim. Below is a breakdown of the financial details for your case:',
    'Settlement Overview',
    '-------------------',
    `Gross Settlement Amount: ${formatCurrency(result.grossSettlement)}`,
    ...result.settlements
      .filter(s => s.description)
      .map(s => `${s.description}: ${formatCurrency(s.amount)}`),
    'This represents the total settlement amount obtained in your case before deductions.',
    'Deductions',
    '----------',
    '1. Attorney\'s Fee',
    `Percentage: ${result.feePercentage}%`,
    `Calculated Fee: ${formatCurrency(result.attorneyFees)}`,
    '2. Case Costs',
    `Total Costs: ${formatCurrency(result.totalCosts)}`,
    ...costs
      .filter(c => c.description)
      .map(c => `- ${c.description}: ${formatCurrency(c.amount)}`),
    'These are expenses incurred during the case, such as filing fees, expert fees, and other litigation costs.',
    '3. Liens',
    `Original Liens Total: ${formatCurrency(result.originalLiens)}`,
    `Reductions Negotiated: ${formatCurrency(totalReduction)}`,
    `Final Liens Paid: ${formatCurrency(result.negotiatedLiens)}`,
    'Detailed Lien Breakdown:',
    ...liens
      .filter(l => l.description)
      .map(l => [
        `${l.description}:`,
        `Original: ${formatCurrency(l.originalAmount)}`,
        `Reduction: ${formatCurrency(l.reductionAmount || 0)}`,
        `Final: ${formatCurrency(l.negotiatedAmount)}`
      ]).flat(),
    `We successfully negotiated substantial reductions on your liens, saving you ${formatCurrency(totalReduction)}.`,
    'Net Recovery',
    '-----------',
    'After deducting the attorney\'s fees, case costs, and reduced liens from the gross settlement, your net recovery is:',
    formatCurrency(result.clientNet),
    'Explanation of the Math',
    '---------------------',
    `Gross Settlement: ${formatCurrency(result.grossSettlement)}`,
    `Attorney's Fee (${result.feePercentage}%): ${formatCurrency(result.attorneyFees)}`,
    `Case Costs: ${formatCurrency(result.totalCosts)}`,
    `Liens Paid: ${formatCurrency(result.negotiatedLiens)}`,
    `Net Recovery: ${formatCurrency(result.clientNet)}`,
    'We are proud to have achieved a significant reduction in your liens, which ensures that more of the settlement is allocated to you. If you have any questions or need further clarification, please do not hesitate to contact our office.',
    'Sincerely,',
    '[Attorney Name]',
    '[Law Firm Name]'
  ].join('\n');

  return sections;
}