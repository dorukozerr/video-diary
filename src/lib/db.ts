import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { openDatabaseAsync } from 'expo-sqlite';

let db: Awaited<ReturnType<typeof openDatabaseAsync>>;

const init = async () => {
  db = await openDatabaseAsync('video-diary');

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS videos (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT, uri TEXT NOT NULL, duration NUMBER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`
  );
};

init();

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

export const getAll = async () => {
  try {
    const response = await db.getAllAsync('SELECT * from videos');

    return { success: true, response };
  } catch (error) {
    console.error('getAll error =>', error);

    return { success: false, response: error };
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
    const id = uuid();

    await db.runAsync(
      'INSERT INTO videos (id, name, description, uri, duration) VALUES (?, ?, ?, ?, ?)',
      id,
      name,
      description,
      uri,
      duration
    );

    return {
      success: true,
      response: `Record ${id} inserted into videos table.`
    };
  } catch (error) {
    console.error('addEntry error =>', error);

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
