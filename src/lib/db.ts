import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { openDatabaseAsync } from 'expo-sqlite';

let db: Awaited<ReturnType<typeof openDatabaseAsync>>;

const init = async () => {
  db = await openDatabaseAsync('video-diary');
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS videos (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT, uri TEXT NOT NULL, duration NUMBER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`
  );
};

init();

export const getAll = async () => {
  try {
    const response = await db.getAllAsync('SELECT * from videos');

    return { success: true, response };
  } catch (error) {
    console.error('getAll error =>', error);

    return { success: false };
  }
};

export const addEntry = async ({
  name,
  description,
  uri,
  duration
}: {
  name: string;
  description: string;
  uri: string;
  duration: number;
}) => {
  try {
    const response = await db.runAsync(
      'INSERT INTO videos (id, name, description, uri, duration) VALUES (?, ?, ?, ?, ?)',
      uuid(),
      name,
      description,
      uri,
      duration
    );

    return { success: true, response };
  } catch (error) {
    console.error('addEntry error =>', error);

    return { success: false };
  }
};

export const deleteAll = async () => {
  try {
    const response = await db.execAsync('DELETE FROM videos');

    return { message: 'success', response };
  } catch (error) {
    console.error('deleteAll error =>', error);

    return null;
  }
};
