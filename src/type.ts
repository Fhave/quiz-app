export type NavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

export type HeaderContextType = {
  title: string;
  setTitle: (title: string) => void;
};

export type SessionParticipant = {
  id: number;
  name: string;
  sessionId: number;
};


export type AnswerType = 'correct' | 'wrong';

export type SessionAnswer = {
  participantId: number;
  questionNumber: number;
  answer: AnswerType;
};

export type SessionContextType = {
  sessionId: number | null;
  sessionName: string;
  sessionParticipants: SessionParticipant[];
  sessionAnswers: SessionAnswer[];
  sessionQuestionCount: number;
  sessionEnded: boolean;

  setSessionId: (id: number | null) => void;
  setSessionName: (name: string) => void;
  setSessionParticipants: (participants: SessionParticipant[]) => void;
  setSessionAnswers: (answers: SessionAnswer[]) => void;
  setSessionQuestionCount: (count: number) => void;
  setSessionEnded: (ended: boolean) => void;
};

export type Session = {
  id: number;
  title: string;
  createdAt: number;
  questionCount?: number;
  ended?: boolean;
};

export type Answer = {
  sessionId: number;
  participantId: number;
  questionNumber: number;
  answer: string;
  createdAt: number;
};
