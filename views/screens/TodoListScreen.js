import { View, StyleSheet, Text } from 'react-native';
import { TodoProvider } from '../../contexts/TodoContext';
import AddNewTodo from '../components/AddNewTodo';
import TodoList from '../components/TodoList';

const TodoListScreen = () => {
  return (
    <TodoProvider>
      <View style={styles.container}>
        <AddNewTodo />
        <TodoList />
      </View>
    </TodoProvider>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1
  },
  header: { 
    fontSize: 20,
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
});

export default TodoListScreen;