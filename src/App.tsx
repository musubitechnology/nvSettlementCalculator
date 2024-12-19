import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import SettlementInput from './components/SettlementInput';
import AttorneyFeeInput from './components/AttorneyFeeInput';
import CostsInput from './components/CostsInput';
import LiensInput from './components/LiensInput';
import Results from './components/Results';
import { useSettlementCalculator } from './hooks/useSettlementCalculator';
import { Settlement, Cost, Lien } from './types';
import { initialLien } from './constants/initialState';

function App() {
  const [settlements, setSettlements] = useState<Settlement[]>([
    { id: uuidv4(), description: '', amount: 0 }
  ]);
  const [feePercentage, setFeePercentage] = useState(33.3);
  const [costs, setCosts] = useState<Cost[]>([
    { id: uuidv4(), description: '', amount: 0 }
  ]);
  const [liens, setLiens] = useState<Lien[]>([initialLien]);

  const result = useSettlementCalculator(
    settlements,
    feePercentage,
    costs,
    liens
  );

  const handleSettlementChange = (id: string, field: keyof Settlement, value: string | number) => {
    setSettlements(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleCostChange = (id: string, field: keyof Cost, value: string | number) => {
    setCosts(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleLienChange = (id: string, field: keyof Lien, value: string | number) => {
    setLiens(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const reset = () => {
    setSettlements([{ id: uuidv4(), description: '', amount: 0 }]);
    setFeePercentage(33.3);
    setCosts([{ id: uuidv4(), description: '', amount: 0 }]);
    setLiens([initialLien]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Scale size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold">Personal Injury Settlement Calculator</h1>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <SettlementInput
              settlements={settlements}
              onAdd={() => setSettlements(prev => [...prev, { id: uuidv4(), description: '', amount: 0 }])}
              onRemove={(id) => setSettlements(prev => prev.filter(s => s.id !== id))}
              onChange={handleSettlementChange}
              total={result.grossSettlement}
            />

            <AttorneyFeeInput
              feePercentage={feePercentage}
              onChange={setFeePercentage}
              grossSettlement={result.grossSettlement}
            />

            <CostsInput
              costs={costs}
              onAdd={() => setCosts(prev => [...prev, { id: uuidv4(), description: '', amount: 0 }])}
              onRemove={(id) => setCosts(prev => prev.filter(c => c.id !== id))}
              onChange={handleCostChange}
              total={result.totalCosts}
            />

            <LiensInput
              liens={liens}
              onAdd={() => setLiens(prev => [...prev, { ...initialLien, id: uuidv4() }])}
              onRemove={(id) => setLiens(prev => prev.filter(l => l.id !== id))}
              onChange={handleLienChange}
              totalOriginal={result.originalLiens}
              totalNegotiated={result.negotiatedLiens}
            />

            <div className="flex gap-4">
              <button
                onClick={reset}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </div>

          <Results result={result} costs={costs} liens={liens} />
        </div>
      </div>
    </div>
  );
}

export default App;