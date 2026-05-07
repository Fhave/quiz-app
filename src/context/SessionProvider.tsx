import { useState, ReactNode } from 'react';
import { SessionContext } from './SessionContext';

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [sessionName, setSessionName] = useState<string>('');
  const [sessionParticipants, setSessionParticipants] = useState<string[]>([]);

  return (
    <SessionContext.Provider value={{ sessionId, setSessionId, sessionName, setSessionName, sessionParticipants, setSessionParticipants }}>
      {children}
    </SessionContext.Provider>
  );
}