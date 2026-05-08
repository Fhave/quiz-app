import { useState, useEffect } from "react";
import { SessionContext } from "./SessionContext";

type Participant = {
  id: number;
  name: string;
  sessionId: number;
};

type SessionAnswer = {
  participantId: number;
  questionNumber: number;
  answer: "correct" | "wrong";
};

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setSessionId] = useState<number | null>(() => {
    const stored = localStorage.getItem("sessionId");
    return stored ? Number(stored) : null;
  });

  const [sessionName, setSessionName] = useState<string>(() => {
    return localStorage.getItem("sessionName") || "";
  });

  const [sessionParticipants, setSessionParticipants] = useState<Participant[]>(
    () => {
      const stored = localStorage.getItem("sessionParticipants");
      return stored ? JSON.parse(stored) : [];
    },
  );

  const [sessionAnswers, setSessionAnswers] = useState<SessionAnswer[]>(() => {
    const stored = localStorage.getItem("sessionAnswers");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("sessionId", sessionId?.toString() || "");
  }, [sessionId]);

  useEffect(() => {
    localStorage.setItem("sessionName", sessionName);
  }, [sessionName]);

  useEffect(() => {
    localStorage.setItem(
      "sessionParticipants",
      JSON.stringify(sessionParticipants),
    );
  }, [sessionParticipants]);

  useEffect(() => {
    localStorage.setItem("sessionAnswers", JSON.stringify(sessionAnswers));
  }, [sessionAnswers]);

  return (
    <SessionContext.Provider
      value={{
        sessionId,
        sessionName,
        sessionParticipants,
        sessionAnswers,

        setSessionId,
        setSessionName,
        setSessionParticipants,
        setSessionAnswers,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
