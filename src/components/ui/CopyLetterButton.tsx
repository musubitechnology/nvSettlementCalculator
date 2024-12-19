import React, { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export function CopyLetterButton({ onClick }: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      {copied ? (
        <>
          <Check size={20} />
          Copied!
        </>
      ) : (
        <>
          <ClipboardCopy size={20} />
          Copy Letter to Clipboard
        </>
      )}
    </button>
  );
}