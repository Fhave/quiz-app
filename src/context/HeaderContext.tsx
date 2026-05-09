import { createContext, useContext } from 'react';
import { type HeaderContextType } from '../type';

export const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}