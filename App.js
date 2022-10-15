import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Schedule from './screens/calendar';
import Home from './screens/home';
import Feed from './screens/feed';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Schedule" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Feed" component={Feed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  main: {
    "marginTop": 30,
  }
}