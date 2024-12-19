import React from 'react';
import { ClipboardCopy, Download, Printer } from 'lucide-react';

interface Props {
  onCopy: () => void;
  onDownload: () => void;
  onPrint: () => void;
}

export function ResultsHeader({ onCopy, onDownload, onPrint }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold">Calculation Results</h3>
      <div className="flex gap-4">
        <button
          onClick={onCopy}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ClipboardCopy size={20} />
          Copy
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <Download size={20} />
          Save
        </button>
        <button
          onClick={onPrint}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <Printer size={20} />
          Print
        </button>
      </div>
    </div>
  );
}