import { createContext, useContext } from 'react';

export type HeaderContextType = {
  title: string;
  setTitle: (title: string) => void;
};

export const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}