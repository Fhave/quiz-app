import { openDB } from 'idb';

const DB_NAME = 'quiz-app';
const DB_VERSION = 1;

export const initDB = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore('sessions', {
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