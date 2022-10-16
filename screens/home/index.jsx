import React, { useEffect } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Paragraph, Text, Title } from 'react-native-paper';
import { getPlaceImg, getPlaces } from '../../apis/logsapi';
import Header from '../../components/header';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import toTitleCase from '../../utils/helper';

const Home = ({ route, navigation }) => {
	const [places, setPlaces] = React.useState([]);
	const [placeImg, setPlaceImg] = React.useState({
		mumbai:
			'https://images.pexels.com/photos/3893788/pexels-photo-3893788.jpeg',
		gurugram:
			'https://media.istockphoto.com/photos/urban-skyscape-picture-id1330495343?b=1&k=20&m=1330495343&s=612x612&w=0&h=one-T-cfx9d2alGPwdXsjtucNw43eZRAIvd7Qebrvno=',
		kochi:
			'https://images.pexels.com/photos/12593493/pexels-photo-12593493.jpeg?auto=compress&cs=tinysrgb&w=600',
		patna:
			'https://images.pexels.com/photos/13135609/pexels-photo-13135609.jpeg?auto=compress&cs=tinysrgb&w=600',
		banglore:
			'https://images.pexels.com/photos/4070763/pexels-photo-4070763.jpeg?auto=compress&cs=tinysrgb&w=600',
		kolkata:
			'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=600',
		indore:
			'https://media.istockphoto.com/photos/rajwada-palace-indore-picture-id539001564?b=1&k=20&m=539001564&s=612x612&w=0&h=w9rqQZeZeCiavVb8ggydzvyp82lHUboZiZvkLu1uFRo=',
	});
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

	// useEffect(() => {
	// 	places.forEach((place) => {
	// 		getPlaceImg(place).then((data) => {
	// 			if (data) {
	// 				console.log(data);
	// 				setPlaceImg((prev) => ({ ...prev, [place]: data }));
	// 			}
	// 		});
	// 	});
	// }, [places]);

	return (
		<View style={styles.container}>
			<Header route={route} navigation={navigation} />
			<ScrollView>
				<View
					style={{
						paddingTop: 20,
						alignItems: 'center',
					}}
				>
					<View style={{ flexDirection: 'column', marginLeft: 20 }}>
						<Title style={{}}>Locations</Title>
						<Paragraph style={{ opacity: 0.4, fontSize: 12, marginTop: 0 }}>
							your most visited places
						</Paragraph>
					</View>
					{places.map((place) => {
						return (
							<Card
								style={{
									padding: 10,
									width: Dimensions.get('window').width * 0.9,
									backgroundColor: '#fff',
									margin: 10,
								}}
								onPress={() => navigation.navigate('Logs', { place })}
							>
								{/* <Card.Cover source={{ uri: `${placeImg[place]}` }} /> */}
								<View
									style={{
										width: '100%',
										marginLeft: 20,
										flexDirection: 'row',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Icon name='location' size={30} />
									<Card.Title title={toTitleCase(place)} />
								</View>
							</Card>
						);
					})}
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
