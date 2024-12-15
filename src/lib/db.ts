import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { openDatabaseAsync } from 'expo-sqlite';

let db: Awaited<ReturnType<typeof openDatabaseAsync>>;

const init = async () => {
  db = await openDatabaseAsync('video-diary');

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS videos (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL, uri TEXT NOT NULL, duration NUMBER NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`
  );
};

init();

export const getAllEntries = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return await db.getAllAsync('SELECT * from videos');
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
}) =>
  await db.runAsync(
    'INSERT INTO videos (id, name, description, uri, duration) VALUES (?, ?, ?, ?, ?)',
    uuid(),
    name,
    description,
    uri,
    duration
  );

//
// Experimentals
//

export const getAllTables = async () => {
  try {
    const tables = await db.getAllAsync(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    );

    return { success: true, response: tables };
  } catch (error) {
    console.error('getAllTables error =>', error);

    return { success: false, response: error };
  }
};

export const dropTable = async (tableName: string) => {
  try {
    await db.execAsync(`DROP TABLE IF EXISTS ${tableName}`);

    return {
      success: true,
      response: `Table ${tableName} dropped successfully.`
    };
  } catch (error) {
    console.error('dropTable error =>', error);

    return { success: false, response: error };
  }
};

export const deleteAll = async () => {
  try {
    await db.execAsync('DELETE FROM videos');

    return {
      message: 'success',
      response: 'All video records deleted from table videos.'
    };
  } catch (error) {
    console.error('deleteAll error =>', error);

    return { success: false, response: error };
  }
};