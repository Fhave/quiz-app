import { useState, type ReactNode } from 'react';
import { HeaderContext } from './HeaderContext';

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState<string>('Quiz Tracker');

  return (
    <HeaderContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderContext.Provider>
  );
}