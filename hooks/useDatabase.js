import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

//define a custom hook to ensure db is opened once and reused as needed 
export default function useDatabase() {
  const [db, setDb] = useState(null);

  useEffect(() => {
    async function openDB() {
      if (!db) {
        const database = await SQLite.openDatabaseAsync('sqlite-todo.db');
        setDb(database);
      }
    }
    openDB();
  }, []);

  return db;
}
