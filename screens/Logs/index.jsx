import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getLogs, getLogsByPlace, getPlaces } from '../../apis/logsapi';
import Header from '../../components/header';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import toTitleCase from '../../utils/helper';

const Logs = ({ route, navigation }) => {
	const [logs, setLogs] = React.useState([]);
	const { state } = useAuth();

	useEffect(() => {
		SecureStore.getItemAsync('pass-store').then((data) => {
			if (data) {
				const { username } = JSON.parse(data);
				getLogsByPlace(state.accessToken, route.params.place).then((data) => {
					setLogs(data.filter((log) => log.user.username !== username));
				});
			}
		});
	}, []);

	return (
		<View style={styles.container}>
			<Header route={route} navigation={navigation} />
			<ScrollView>
				{logs.length ? (
					logs.map((log) => (
						<Card
							style={{
								margin: 15,
							}}
							onPress={() => {
								let startDate = new Date(log.startDate);
								startDate.setDate(startDate.getDate() - 2);
								let endDate = new Date(log.endDate);
								endDate.setDate(endDate.getDate() + 2);
								navigation.navigate('Copy', {
									logId: log.id,
									startDate: startDate.toISOString().split('T')[0],
									endDate: endDate.toISOString().split('T')[0],
									username: log.user.username,
								});
							}}
						>
							<Card.Title
								title={`${new Date(log.startDate.split('T')[0])
									.toString()
									.split(' ')
									.slice(1, 4)
									.join(' ')}  to  ${new Date(log.endDate.split('T')[0])
									.toString()
									.split(' ')
									.slice(1, 4)
									.join(' ')}`}
								subtitle={log.user.username}
							/>
							<Card.Content>
								<Text
									style={{
										alignSelf: 'flex-end',
									}}
								>
									{toTitleCase(log.place.toString())}
								</Text>
							</Card.Content>
						</Card>
					))
				) : (
					<Text
						style={{
							alignSelf: 'center',
							marginTop: 20,
						}}
					>
						No logs found
					</Text>
				)}
			</ScrollView>
		</View>
	);
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: 'whitesmoke',
	},
};

export default Logs;
