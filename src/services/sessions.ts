import { initDB } from './db';
import { type Session } from '../type';

export async function createSession(
  title: string,
  questionCount: number,
): Promise<number> {
  const db = await initDB;
  const id = await db.add('sessions', {
    title,
    createdAt: Date.now(),
    questionCount,
  });
  return Number(id);
}

export async function getSessions(): Promise<Session[]> {
  const db = await initDB;
  return db.getAll('sessions');
}

export async function getSession(id: number): Promise<Session | undefined> {
  const db = await initDB;
  return db.get('sessions', id);
}

export async function deleteSession(id: number): Promise<void> {
  const db = await initDB;
  await db.delete('sessions', id);
}