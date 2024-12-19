import React from 'react';

interface Props {
  firmInfo?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  clientInfo?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

export function LetterHeader({ firmInfo, clientInfo }: Props) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8">
      <div>
        <p>{firmInfo?.name || '[Your Law Firm Name]'}</p>
        <p>{firmInfo?.address || '[Address]'}</p>
        <p>{firmInfo?.city && firmInfo?.state && firmInfo?.zip 
          ? `${firmInfo.city}, ${firmInfo.state} ${firmInfo.zip}`
          : '[City, State, ZIP Code]'}</p>
        <p>{today}</p>
      </div>

      <div>
        <p>{clientInfo?.name || '[Client Name]'}</p>
        <p>{clientInfo?.address || '[Client Address]'}</p>
        <p>{clientInfo?.city && clientInfo?.state && clientInfo?.zip 
          ? `${clientInfo.city}, ${clientInfo.state} ${clientInfo.zip}`
          : '[City, State, ZIP Code]'}</p>
      </div>

      <div>
        <p className="font-bold">Subject: Summary of Net Recovery from Settlement</p>
      </div>

      <div>
        <p>Dear {clientInfo?.name || '[Client Name]'},</p>
      </div>
    </div>
  );
}