import { initDB } from "./db";

type Answer = {
  id: number;
  sessionId: number;
  participantId: number;
  questionNumber: number;
  answer: string;
  createdAt: number;
};

export async function createAnswer(answer: Answer): Promise<number> {
  const db = await initDB;
  const id = await db.add('answers', answer);
  return id;
}

export async function getAnswers(sessionId: number): Promise<Answer[]> {
  const db = await initDB;
  return db.getAll('answers', { sessionId });
}

export async function getSessionAnswersList( sessionId: number ): Promise<Answer[]> {
  const db = await initDB;
  return db.getAllFromIndex("answers", "sessionId", sessionId);
}

export async function getAnswer(id: number): Promise<Answer | undefined> {
  const db = await initDB;
  return db.get('answers', id);
}

export async function deleteAnswer(id: number): Promise<void> {
  const db = await initDB;
  await db.delete('answers', id);
}