import { StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';

let db; // Declare database variable globally

export default function App() {
  const [todo, setTodo] = useState(''); // state variable to track new todo item
  const [todos, setTodos] = useState([]); // state variable to track todos list

  useEffect(() => {
    // Open database asynchronously
    async function openDB() {
      db = await SQLite.openDatabaseAsync('sqlite-example.db');
      console.log('Database opened:', db);
      await createTable();
      await fetchTodos();
    }
    openDB();
  }, []);

  // Create table 'todos' if it does not exist
  async function createTable() {
    if (!db) return;
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL
      );
    `);
  }

  // Fetch all todos from database
  async function fetchTodos() {
    if (!db) return;
    const results = await db.getAllAsync('SELECT * FROM todos;');
    setTodos(results);
  }

  // Insert name into database
  async function addTodo() {
    if (!todo || !db) return;
    await db.runAsync('INSERT INTO todos (todo) VALUES (?);', [todo]);
    setTodo(''); // Clear input after inserting the current todo into the db table
    await fetchTodos(); // Refresh list
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expo SQLite - ToDo</Text>
      <TextInput
        style={styles.todoInput}
        placeholder="Enter task to do"
        value={todo}
        onChangeText={setTodo}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={ ({ item }) => {
          return (
            <View style={styles.todoItemContainer}>
                <Text style={styles.todoItemText}>{item.todo}</Text>
            </View>
            
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 50
  },
  header: { 
    fontSize: 20, 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  todoInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginVertical: 15,
    padding: 10,
    marginLeft: '5%',
    width: '90%'
  },
  todoItemContainer: {
    backgroundColor: 'lightyellow',
    marginTop: 10,
    marginLeft: 10,
    width: '60%',
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  todoItemText: {
      paddingTop: 10,
      paddingLeft: 10,
      paddingBottom: 10,
      fontSize: 18
  }
});
