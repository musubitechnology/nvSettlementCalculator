import React from 'react';
import { CalculationResult, Cost, Lien, Settlement } from '../../types';
import { formatCurrency } from '../../utils/formatting';

interface Props {
  result: CalculationResult;
  costs: Cost[];
  liens: Lien[];
}

export function LetterBody({ result, costs, liens }: Props) {
  const totalReduction = result.originalLiens - result.negotiatedLiens;
  const reductionPercentage = result.originalLiens > 0 
    ? ((totalReduction / result.originalLiens) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      <p>I hope this letter finds you well. I am writing to provide you with a detailed summary of your net recovery following the resolution of your personal injury claim. Below is a breakdown of the financial details for your case:</p>

      <section>
        <h2 className="font-bold">Settlement Overview</h2>
        <p>Gross Settlement Amount: {formatCurrency(result.grossSettlement)}</p>
        {result.settlements.map((settlement, index) => (
          settlement.description && (
            <p key={settlement.id} className="ml-4 text-sm">
              {settlement.description}: {formatCurrency(settlement.amount)}
            </p>
          )
        ))}
        <p className="text-sm mt-2">This represents the total settlement amount obtained in your case before deductions.</p>
      </section>

      <section>
        <h2 className="font-bold">Deductions</h2>
        
        <div className="ml-4 space-y-4">
          <div>
            <h3 className="font-bold">Attorney's Fee</h3>
            <p>Percentage: {result.feePercentage}%</p>
            <p>Calculated Fee: {formatCurrency(result.attorneyFees)}</p>
          </div>

          <div>
            <h3 className="font-bold">Case Costs</h3>
            <p>Total Costs: {formatCurrency(result.totalCosts)}</p>
            {costs.length > 0 && (
              <ul className="list-disc ml-4">
                {costs.map(cost => cost.description && (
                  <li key={cost.id}>
                    {cost.description}: {formatCurrency(cost.amount)}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-sm">These are expenses incurred during the case, such as filing fees, expert fees, and other litigation costs.</p>
          </div>

          <div>
            <h3 className="font-bold">Liens</h3>
            <p>Original Liens Total: {formatCurrency(result.originalLiens)}</p>
            <p>Reductions Negotiated: {formatCurrency(totalReduction)}</p>
            <p>Final Liens Paid: {formatCurrency(result.negotiatedLiens)}</p>
            
            {liens.length > 0 && (
              <div className="mt-2">
                <p className="font-bold">Detailed Lien Breakdown:</p>
                <ul className="list-disc ml-4">
                  {liens.map(lien => lien.description && (
                    <li key={lien.id}>
                      {lien.description}:
                      <ul className="list-none ml-4">
                        <li>Original: {formatCurrency(lien.originalAmount)}</li>
                        <li>Reduction: {formatCurrency(lien.reductionAmount || 0)}</li>
                        <li>Final: {formatCurrency(lien.negotiatedAmount)}</li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <p>We successfully negotiated substantial reductions on your liens by {reductionPercentage}%, saving you {formatCurrency(totalReduction)}.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-bold">Net Recovery</h2>
        <p>After deducting the attorney's fees, case costs, and reduced liens from the gross settlement, your net recovery is:</p>
        <p className="text-xl font-bold">{formatCurrency(result.clientNet)}</p>
      </section>

      <section>
        <h2 className="font-bold">Explanation of the Math</h2>
        <ul className="list-none ml-4">
          <li>Gross Settlement: {formatCurrency(result.grossSettlement)}</li>
          <li>Attorney's Fee ({result.feePercentage}%): {formatCurrency(result.attorneyFees)}</li>
          <li>Case Costs: {formatCurrency(result.totalCosts)}</li>
          <li>Liens Paid: {formatCurrency(result.negotiatedLiens)}</li>
          <li className="font-bold">Net Recovery: {formatCurrency(result.clientNet)}</li>
        </ul>
      </section>

      <p>We are proud to have achieved a significant reduction in your liens, which ensures that more of the settlement is allocated to you. If you have any questions or need further clarification, please do not hesitate to contact our office.</p>
    </div>
  );
}