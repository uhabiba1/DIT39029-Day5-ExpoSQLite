import { fetchTodos, insertTodo, updateTodoById, deleteTodoById } from '../models/database';

export async function getTodos(db, setTodos) {
  const todos = await fetchTodos(db);
  setTodos(todos);
}

//adds new todo and then return the latest todos list
export async function addTodo(db, todo, setTodos) {
  await insertTodo(db, todo);
  await getTodos(db, setTodos);
}
//updates an existing todo and then return the latest todos list
export async function updateTodo(db, id, newTodo, setTodos) {
  await updateTodoById(db, id, newTodo);
  await getTodos(db, setTodos);
}
//deletes the todo and then return the latest todos list
export async function deleteTodo(db, id, setTodos) {
  await deleteTodoById(db, id);
  await getTodos(db, setTodos);
}
