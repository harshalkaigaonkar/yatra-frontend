import React from 'react';
import {
	Dimensions,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
} from 'react-native';
import { Text } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = ({ route, navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.appName}>Yatra</Text>
			<View style={styles.rp}>
				<TouchableNativeFeedback
					onPress={() => {
						navigation.navigate('Schedule');
					}}
				>
					<View style={styles.icon}>
						{route.name === 'Home' || route.name === 'Schedule' ? (
							<Icon name='layer-group' size={30} color='black' />
						) : (
							<Icon name='calendar' size={30} color='black' />
						)}
					</View>
				</TouchableNativeFeedback>
			</View>
		</View>
	);
};

const styles = {
	container: {
		height: 90,
		width: windowWidth,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},
	appName: {
		fontSize: 20,
		fontWeight: '900',
	},
	rp: {
		width: 'auto',
		maxWidth: 200,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	icon: {
		width: 40,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	location: {
		width: 'auto',
		maxWidth: 120,
		marginLeft: 20,
		marginRight: 20,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	arrowDown: {
		height: '100%',
		alignItems: 'flex-start',
	},
	locationName: {
		marginLeft: 5,
		marginRight: 5,
	},
};

export default Header;
