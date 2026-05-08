import { initDB } from "./db";

export type Participant = {
  id: number;
  sessionId: number;
  name: string;
};

export async function createParticipant(participant: Participant): Promise<number> {
  const db = await initDB;
  const id = await db.add('participants', participant);
  return id;
}

export async function createParticipants(participants: string[], sessionId: number): Promise<Participant[]> {
  const db = await initDB;
  const tx = db.transaction('participants', 'readwrite');
  const createdParticipants: Participant[] = [];

  for (const name of participants) {
    const id = await tx.store.add({ name, sessionId });
    createdParticipants.push({ id, name });
  }

  await tx.done;
  return createdParticipants;
}

export async function getParticipantsBySession(sessionId: number): Promise<Participant[]> {
  const db = await initDB;
  return db.getAllFromIndex('participants', 'sessionId', sessionId);
}

export async function getParticipants(sessionId: number): Promise<Participant[]> {
  const db = await initDB;
  return db.getAll('participants', { sessionId });
}

export async function getParticipant(id: number): Promise<Participant | undefined> {
  const db = await initDB;
  return db.get('participants', id);
}

export async function deleteParticipant(id: number): Promise<void> {
  const db = await initDB;
  await db.delete('participants', id);
}