export const calculatePercentageReduction = (originalAmount: number, percentage: number): number => {
  if (originalAmount === 0) return 0;
  const reduction = (originalAmount * percentage) / 100;
  return originalAmount - reduction;
};

export const calculateReductionPercentage = (originalAmount: number, negotiatedAmount: number): number => {
  if (originalAmount === 0) return 0;
  return ((originalAmount - negotiatedAmount) / originalAmount) * 100;
};

export const calculateAverageReduction = (originalAmount: number, negotiatedAmount: number): number => {
  if (originalAmount === 0) return 0;
  const totalReduction = originalAmount - negotiatedAmount;
  const reductionPercentage = (totalReduction / originalAmount) * 100;
  return reductionPercentage;
};

export const roundToDecimal = (value: number, decimals: number = 2): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
};