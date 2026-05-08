import { createContext, useContext } from 'react';

export type Participant = {
  id: number;
  name: string;
};

export type AnswerType = 'correct' | 'wrong';

export type Answer = {
  participantId: number;
  questionNumber: number;
  answer: AnswerType;
};

export type SessionContextType = {
  sessionId: number | null;
  sessionName: string;
  sessionParticipants: Participant[];
  sessionAnswers: Answer[];

  setSessionId: (id: number | null) => void;
  setSessionName: (name: string) => void;
  setSessionParticipants: (participants: Participant[]) => void;
  setSessionAnswers: (answers: Answer[]) => void;
};


export const SessionContext = createContext<SessionContextType | null>(null);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}