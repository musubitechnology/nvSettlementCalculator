import { useCallback } from 'react';
import { Lien } from '../types';
import { roundToDecimal } from '../utils/calculations';

export function useLienCalculations(
  lien: Lien,
  onChange: (id: string, field: keyof Lien, value: string | number) => void
) {
  const handleOriginalAmountChange = useCallback((originalAmount: number) => {
    onChange(lien.id, 'originalAmount', originalAmount);
    if (lien.reductionPercentage) {
      const reductionAmount = (originalAmount * lien.reductionPercentage) / 100;
      const negotiatedAmount = originalAmount - reductionAmount;
      onChange(lien.id, 'reductionAmount', roundToDecimal(reductionAmount));
      onChange(lien.id, 'negotiatedAmount', roundToDecimal(negotiatedAmount));
    }
  }, [lien.id, lien.reductionPercentage, onChange]);

  const handleReductionAmountChange = useCallback((reductionAmount: number) => {
    onChange(lien.id, 'reductionAmount', reductionAmount);
    if (lien.originalAmount > 0) {
      const percentage = (reductionAmount / lien.originalAmount) * 100;
      const negotiatedAmount = lien.originalAmount - reductionAmount;
      onChange(lien.id, 'reductionPercentage', roundToDecimal(percentage, 1));
      onChange(lien.id, 'negotiatedAmount', roundToDecimal(negotiatedAmount));
    }
  }, [lien.id, lien.originalAmount, onChange]);

  const handlePercentageChange = useCallback((percentage: number) => {
    if (percentage >= 0 && percentage <= 100) {
      onChange(lien.id, 'reductionPercentage', percentage);
      const reductionAmount = (lien.originalAmount * percentage) / 100;
      const negotiatedAmount = lien.originalAmount - reductionAmount;
      onChange(lien.id, 'reductionAmount', roundToDecimal(reductionAmount));
      onChange(lien.id, 'negotiatedAmount', roundToDecimal(negotiatedAmount));
    }
  }, [lien.id, lien.originalAmount, onChange]);

  const handleNegotiatedAmountChange = useCallback((negotiatedAmount: number) => {
    onChange(lien.id, 'negotiatedAmount', negotiatedAmount);
    if (lien.originalAmount > 0) {
      const reductionAmount = lien.originalAmount - negotiatedAmount;
      const percentage = (reductionAmount / lien.originalAmount) * 100;
      onChange(lien.id, 'reductionAmount', roundToDecimal(reductionAmount));
      onChange(lien.id, 'reductionPercentage', roundToDecimal(percentage, 1));
    }
  }, [lien.id, lien.originalAmount, onChange]);

  return {
    handleOriginalAmountChange,
    handleReductionAmountChange,
    handlePercentageChange,
    handleNegotiatedAmountChange
  };
}