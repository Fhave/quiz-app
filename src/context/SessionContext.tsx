import { createContext, useContext } from 'react';

export type SessionContextType = {
  sessionId: number | null;
  sessionName: string;
  sessionParticipants: string[];

  setSessionId: (id: number) => void;
  setSessionName: (name: string) => void;
  setSessionParticipants: (participants: string[]) => void;
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}