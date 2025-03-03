import React, { useContext, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TodoContext } from '../../contexts/TodoContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TodoList() {
  const { todos, updateTodo, deleteTodo } = useContext(TodoContext);

  //local state variables related to UI views
  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState('');

  const editHandler = (id, currentText) => {
    setEditingId(id);
    setNewText(currentText);
  };

  const updateHandler = () => {
    if (newText.trim()) {
      updateTodo(editingId, newText);
      setEditingId(null);
      setNewText('');
    }
  };

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}

      renderItem={ ({ item }) => {
        return (
          <View style={styles.todoItemContainer}>
              {editingId === item.id ? (
                  <TextInput
                      style={styles.todoEditInput}
                      value={newText}
                      onChangeText={setNewText}
                      onSubmitEditing={updateHandler}
                      autoFocus
                  />
              ) : (
                  <Text style={styles.todoItemText}>{item.todo}</Text>
              )}

          <View style={styles.iconContainer}>
            {editingId === item.id ? (
              <TouchableOpacity onPress={updateHandler}>
                <Icon name="check" size={24} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => editHandler(item.id, item.todo)}>
                <Icon name="edit" size={24} color="blue" />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
          </View>
          
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  todoItemContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightyellow',
    marginTop: 10,
    marginLeft: '5%',
    width: '90%',
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  todoItemText: {
      flex: 1,
      paddingTop: 10,
      paddingLeft: 10,
      paddingBottom: 10,
      fontSize: 18
  },
  todoEditInput: {
    flex:1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    paddingLeft: 10,
  },
});
