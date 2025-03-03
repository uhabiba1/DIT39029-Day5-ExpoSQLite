import React, { createContext, useState, useEffect } from 'react';
import useDatabase from '../hooks/useDatabase';
import { createTable } from '../models/database';
import { getTodos, addTodo, updateTodo, deleteTodo} from '../controllers/todoController'

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const db = useDatabase();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function initializeDB() {
      if (db) {
        await createTable(db);
        await getTodos(db, setTodos);
      }
    }
    initializeDB();
  }, [db]);
  
  return (
    <TodoContext.Provider value={{ 
        todos, 
        addTodo: (todo) => addTodo(db, todo, setTodos), 
        updateTodo: (id, newTodo) => updateTodo(db, id, newTodo, setTodos), 
        deleteTodo: (id) => deleteTodo(db, id, setTodos) 
    }}>
      {children}
    </TodoContext.Provider>
  );
};
