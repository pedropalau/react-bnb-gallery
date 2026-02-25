import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <div className="flex-1" role="main">
      {children}
    </div>
  );
}
