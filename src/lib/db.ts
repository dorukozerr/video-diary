import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { openDatabaseAsync } from 'expo-sqlite';
import { Video } from '@/types';

let db: Awaited<ReturnType<typeof openDatabaseAsync>>;

const initializeDB = async () => {
  db = await openDatabaseAsync('video-diary');

  await db.execAsync(
    'CREATE TABLE IF NOT EXISTS videos (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL, uri TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)'
  );
};

initializeDB();

export const getAllEntries = async () =>
  (await db.getAllAsync('SELECT * from videos')) as Video[];

export const addEntry = async ({
  name,
  description,
  uri
}: {
  name: string;
  description: string;
  uri: string;
}) =>
  await db.runAsync(
    'INSERT INTO videos (id, name, description, uri) VALUES (?, ?, ?, ?)',
    uuid(),
    name,
    description,
    uri
  );

export const getEntry = async (id: string) =>
  (await db.getFirstAsync(
    'SELECT * FROM videos WHERE id = ?',
    id
  )) as Video | null;

export const updateEntry = async ({
  id,
  name,
  description
}: {
  id: string;
  name: string;
  description: string;
}) =>
  await db.runAsync(
    'UPDATE videos SET name = ?, description = ? WHERE id = ?',
    name,
    description,
    id
  );

export const deleteEntry = async (id: string) =>
  await db.runAsync('DELETE FROM videos WHERE id = ?', id);

//
// Experimentals
//

export const getAllTables = async () =>
  await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
  );

export const dropTable = async (tableName: string) =>
  await db.execAsync(`DROP TABLE IF EXISTS ${tableName}`);

export const deleteAll = async () => await db.execAsync('DELETE FROM videos');
