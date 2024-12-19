export interface Settlement {
  id: string;
  description: string;
  amount: number;
}

export interface Cost {
  id: string;
  description: string;
  amount: number;
}

export interface Lien {
  id: string;
  description: string;
  originalAmount: number;
  reductionAmount?: number;
  reductionPercentage?: number;
  negotiatedAmount: number;
}

export interface CalculationResult {
  grossSettlement: number;
  attorneyFees: number;
  totalCosts: number;
  originalLiens: number;
  negotiatedLiens: number;
  clientNet: number;
  feePercentage: number;
  settlements: Settlement[]; // Add this line
}