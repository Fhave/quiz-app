import { initDB } from "./db";
import { type SessionParticipant } from "../type";

export async function createParticipant(participant: SessionParticipant): Promise<number> {
  const db = await initDB;
  const id = await db.add('participants', participant);
  return Number(id);
}

export async function createParticipants(participants: string[], sessionId: number): Promise<SessionParticipant[]> {
  const db = await initDB;
  const tx = db.transaction('participants', 'readwrite');
  const createdParticipants: SessionParticipant[] = [];

  for (const name of participants) {
    const id = await tx.store.add({ name, sessionId });
    const numericId = typeof id === 'number' ? id : Number(id);
    createdParticipants.push({ id: numericId, name, sessionId });
  }

  await tx.done;
  return createdParticipants;
}

export async function getParticipants(sessionId: number): Promise<SessionParticipant[]> {
  const db = await initDB;
  return db.getAllFromIndex('participants', 'sessionId', sessionId);
}

export async function getParticipant(id: number): Promise<SessionParticipant | undefined> {
  const db = await initDB;
  return db.get('participants', id);
}

export async function deleteParticipant(id: number): Promise<void> {
  const db = await initDB;
  await db.delete('participants', id);
}