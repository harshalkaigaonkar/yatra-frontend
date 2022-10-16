import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getPlaces } from '../../apis/logsapi';
import Header from '../../components/header';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from 'react-native-paper';

const Home = ({ route, navigation }) => {
	const [places, setPlaces] = React.useState([]);
	const { state } = useAuth();

	useEffect(() => {
		getPlaces(state.accessToken).then((data) => {
			if (data) {
				setPlaces(
					data
						.map((place) => place.place)
						.filter((place) => !place.includes('2') && !place.includes('['))
				);
			}
		});
	}, []);

	return (
		<View style={styles.container}>
			<Header route={route} navigation={navigation} />
			<ScrollView>
				<View
					style={{
						paddingTop: 20,
						flexDirection: 'row',
						flexWrap: 'wrap',
					}}
				>
					{places.map((place) => (
						<Card
							style={{
								margin: 15,
								width: '40%',
							}}
							onPress={() => navigation.navigate('Logs', { place })}
						>
							<Card.Title title={place} />
						</Card>
					))}
				</View>
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

export default Home;
