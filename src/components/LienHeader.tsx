import React from 'react';

export function LienHeader() {
  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-t-lg border-b border-gray-200">
      <div className="col-span-3 text-sm font-medium text-gray-600">Description</div>
      <div className="col-span-2 text-sm font-medium text-gray-600">Original Amount</div>
      <div className="col-span-2 text-sm font-medium text-gray-600">Reduction Amount</div>
      <div className="col-span-2 text-sm font-medium text-gray-600">Reduction %</div>
      <div className="col-span-3 text-sm font-medium text-gray-600">Negotiated Amount</div>
    </div>
  );
}