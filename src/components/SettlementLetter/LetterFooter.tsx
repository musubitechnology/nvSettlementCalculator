import React from 'react';

interface Props {
  firmInfo?: {
    attorney: string;
    name: string;
    phone: string;
    email: string;
  };
}

export function LetterFooter({ firmInfo }: Props) {
  return (
    <div className="space-y-4">
      <p>
        If you have any questions or need further clarification, please do not hesitate to contact our office
        {firmInfo?.phone && firmInfo?.email && (
          <> at {firmInfo.phone} or {firmInfo.email}</>
        )}.
      </p>
      
      <div className="mt-8 space-y-1">
        <p>Sincerely,</p>
        <p>{firmInfo?.attorney || '[Attorney Name]'}</p>
        <p>{firmInfo?.name || '[Law Firm Name]'}</p>
      </div>
    </div>
  );
}