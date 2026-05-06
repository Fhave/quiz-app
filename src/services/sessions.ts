import { initDB } from './db';

export type Session = {
  id?: number;
  title: string;
  createdAt: number;
};

export async function createSession(title: string): Promise<number> {
  const db = await initDB;
  const id = await db.add('sessions', {
    title,
    createdAt: Date.now(),
  });
  return id;
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