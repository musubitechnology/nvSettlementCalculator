import { useState, useEffect, useCallback } from 'react';

export function useCurrencyInput(
  value: number,
  onChange: (value: number) => void
) {
  const [displayValue, setDisplayValue] = useState('');

  // Format number to display with commas
  const formatForDisplay = useCallback((num: number) => {
    return num.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    });
  }, []);

  // Update display value when the actual value changes
  useEffect(() => {
    setDisplayValue(value ? formatForDisplay(value) : '');
  }, [value, formatForDisplay]);

  // Handle input changes
  const handleChange = (inputValue: string) => {
    // Remove all non-numeric characters except decimal point
    const cleanValue = inputValue.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = cleanValue.split('.');
    const sanitizedValue = parts[0] + (parts.length > 1 ? '.' + parts[1] : '');
    
    // Convert to number
    const numericValue = parseFloat(sanitizedValue) || 0;
    
    // Update the display value with commas
    setDisplayValue(inputValue);
    
    // Call onChange with the numeric value
    onChange(numericValue);
  };

  return {
    displayValue,
    handleChange
  };
}