import { useState, useEffect } from "react";
import { SessionContext } from "./SessionContext";
import { type SessionAnswer, type SessionParticipant } from "../type";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setSessionId] = useState<number | null>(() => {
    const stored = localStorage.getItem("sessionId");
    return stored ? Number(stored) : null;
  });

  const [sessionName, setSessionName] = useState<string>(() => {
    return localStorage.getItem("sessionName") || "";
  });

  const [sessionParticipants, setSessionParticipants] = useState<SessionParticipant[]>(
    () => {
      const stored = localStorage.getItem("sessionParticipants");
      return stored ? JSON.parse(stored) : [];
    },
  );

  const [sessionAnswers, setSessionAnswers] = useState<SessionAnswer[]>(() => {
    const stored = localStorage.getItem("sessionAnswers");
    return stored ? JSON.parse(stored) : [];
  });

  const [sessionQuestionCount, setSessionQuestionCount] = useState<number>(() => {
    const stored = localStorage.getItem("sessionQuestionCount");
    return stored ? Number(stored) : 0;
  });

  const [sessionEnded, setSessionEnded] = useState<boolean>(() => {
    const stored = localStorage.getItem("sessionEnded");
    return stored ? stored === "true" : false;
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

  useEffect(() => {
    localStorage.setItem(
      "sessionQuestionCount",
      sessionQuestionCount.toString(),
    );
  }, [sessionQuestionCount]);

  useEffect(() => {
    localStorage.setItem("sessionEnded", sessionEnded.toString());
  }, [sessionEnded]);

  return (
    <SessionContext.Provider
      value={{
        sessionId,
        sessionName,
        sessionParticipants,
        sessionAnswers,
        sessionQuestionCount,
        sessionEnded,

        setSessionId,
        setSessionName,
        setSessionParticipants,
        setSessionAnswers,
        setSessionQuestionCount,
        setSessionEnded,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
