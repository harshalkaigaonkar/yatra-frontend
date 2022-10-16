import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Schedule from './screens/calendar';
import Home from './screens/home';
import Feed from './screens/feed';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import { AuthProvider } from './contexts/AuthContext';
import Logs from './screens/Logs';
import OtherLog from './screens/calendar/copycalendar';

const Stack = createStackNavigator();

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName='Login'
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name='Schedule' component={Schedule} />
					<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name='Feed' component={Feed} />
					<Stack.Screen name='Logs' component={Logs} />
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='Copy' component={OtherLog} />
					<Stack.Screen name='Register' component={Register} />
				</Stack.Navigator>
			</NavigationContainer>
		</AuthProvider>
	);
}

const styles = {
	main: {
		marginTop: 30,
	},
};
