import { openDB } from 'idb';

const DB_NAME = 'quiz-app';
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade: async (db) => {
      await db.createObjectStore('sessions', {
        keyPath: 'id',
        autoIncrement: true,
      });

      const participantStore = db.createObjectStore('participants', {
        keyPath: 'id',
        autoIncrement: true,
      });
      participantStore.createIndex('sessionId', 'sessionId');

      const answerStore = db.createObjectStore('answers', {
        keyPath: 'id',
        autoIncrement: true,
      });
      answerStore.createIndex('participantId', 'participantId');
      answerStore.createIndex('sessionId', 'sessionId');
      answerStore.createIndex('questionNumber', 'questionNumber');
    },
  });

  return db;
};