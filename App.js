import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoListScreen from './views/screens/TodoListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="TodoApp" component={TodoListScreen} options={{title: 'Todo List'}}/>
          </Stack.Navigator>
        </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});