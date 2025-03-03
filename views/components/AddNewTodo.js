import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { TodoContext } from '../../contexts/TodoContext';

export default function AddNewTodo() {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodoContext);

  const onPressHandler = () => { 
    if(todo.trim()!== '') {
      addTodo(todo);
      setTodo('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.todoInput}
        placeholder="Enter task to do"
        value={todo}
        onChangeText={setTodo}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={onPressHandler}>
          <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 10 
  },
  todoInput: {
    fontSize: 18,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginVertical: 15,
    padding: 10,
    marginLeft: '5%',
    width: '90%'
  },
  buttonContainer: {
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
    width: 150,
    borderRadius: 10,
    alignSelf: 'center'
  },
  buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
  }
});
