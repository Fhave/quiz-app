import { initDB } from "./db";
import { type Answer } from "../type";

export async function createAnswer(answer: Answer): Promise<number> {
  const db = await initDB();
  const id = await db.add('answers', answer);
  return Number(id);
}

export async function getAnswers(sessionId: number): Promise<Answer[]> {
  const db = await initDB();
  return db.getAllFromIndex('answers', 'sessionId', sessionId);
}

export async function getAnswer(id: number): Promise<Answer | undefined> {
  const db = await initDB();
  return db.get('answers', id);
}

export async function deleteAnswer(id: number): Promise<void> {
  const db = await initDB();
  await db.delete('answers', id);
}