// create new database table
export async function createTable(db) {
    if (!db) return;
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL
      );
    `);
  }
  // fetch data from database table
  export async function fetchTodos(db) {
    if (!db) return [];
    return await db.getAllAsync('SELECT * FROM todos;');
  }
  
  // insert new row into database table
  export async function insertTodo(db, todo) {
    if (!db) return;
    await db.runAsync('INSERT INTO todos (todo) VALUES (?);', [todo]);
  }
  
  // update existing data record in the database table
  export async function updateTodoById(db, id, newTodo) {
    if (!db) return;
    await db.runAsync('UPDATE todos SET todo = ? WHERE id = ?;', [newTodo, id]);
  }
  
  // delete a record from the database table
  export async function deleteTodoById(db, id) {
    if (!db) return;
    await db.runAsync('DELETE FROM todos WHERE id = ?;', [id]);
  }
  