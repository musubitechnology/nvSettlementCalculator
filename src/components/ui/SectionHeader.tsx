import React from 'react';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, children }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}