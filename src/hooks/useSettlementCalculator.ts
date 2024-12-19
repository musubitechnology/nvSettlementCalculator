import { useMemo } from 'react';
import { Settlement, Cost, Lien, CalculationResult } from '../types';

export function useSettlementCalculator(
  settlements: Settlement[],
  feePercentage: number,
  costs: Cost[],
  medicalLiens: Lien[]
): CalculationResult {
  return useMemo(() => {
    const grossSettlement = settlements.reduce((sum, s) => sum + (s.amount || 0), 0);
    const attorneyFees = (grossSettlement * feePercentage) / 100;
    const totalCosts = costs.reduce((sum, c) => sum + (c.amount || 0), 0);
    
    const originalLiens = medicalLiens.reduce((sum, l) => sum + (l.originalAmount || 0), 0);
    const negotiatedLiens = medicalLiens.reduce((sum, l) => sum + (l.negotiatedAmount || 0), 0);
    
    const clientNet = grossSettlement - attorneyFees - totalCosts - negotiatedLiens;
    
    return {
      grossSettlement,
      attorneyFees,
      totalCosts,
      originalLiens,
      negotiatedLiens,
      clientNet,
      feePercentage,
      settlements // Add this line
    };
  }, [settlements, feePercentage, costs, medicalLiens]);
}