import React from 'react';
import {
	Dimensions,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
} from 'react-native';
import { Text } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = ({ route, navigation, places, onPlaceChange }) => {
	return (
		<View style={styles.container}>
			<Text onPress={() => navigation.navigate('Home')} style={styles.appName}>
				Yatra
			</Text>
			<View style={styles.rp}>
				{route.name === 'Schedule' && (
					<TouchableNativeFeedback
						onPress={() => {
							navigation.navigate('Feed');
						}}
					>
						<View style={styles.icon}>
							<Icon name='layer-group' size={30} color='black' />
						</View>
					</TouchableNativeFeedback>
				)}
				{route.name === 'Feed' && (
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							paddingTop: 10,
							justifyContent: 'space-between',
							width: windowWidth * 0.4,
						}}
					>
						<SelectDropdown
							data={['select', ...places]}
							defaultValue='select'
							dropdownStyle={{
								width: windowWidth * 0.4,
							}}
							buttonStyle={{
								backgroundColor: 'white',
								borderColor: 'black',
								borderWidth: 1,
								width: 100,
								marginRight: 10,
								height: 40,
								borderRadius: 5,
							}}
							onSelect={(selectedItem, index) => {
								onPlaceChange(selectedItem);
							}}
							buttonTextAfterSelection={(selectedItem, index) => {
								// text represented after item is selected
								// if data array is an array of objects then return selectedItem.property to render after item is selected
								return selectedItem;
							}}
							rowTextForSelection={(item, index) => {
								// text represented for each item in dropdown
								// if data array is an array of objects then return item.property to represent item in dropdown
								return item;
							}}
						/>
						<TouchableNativeFeedback
							onPress={() => {
								navigation.navigate('Schedule');
							}}
						>
							<Icon name='calendar' size={30} color='black' />
						</TouchableNativeFeedback>
					</View>
				)}
				{route.name === 'Home' && (
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							paddingTop: 10,
							justifyContent: 'space-between',
							width: windowWidth * 0.25,
						}}
					>
						<TouchableNativeFeedback
							onPress={() => {
								navigation.navigate('Feed');
							}}
						>
							<View style={styles.icon}>
								<Icon name='layer-group' size={30} color='black' />
							</View>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback
							onPress={() => {
								navigation.navigate('Schedule');
							}}
						>
							<Icon name='calendar' size={30} color='black' />
						</TouchableNativeFeedback>
					</View>
				)}
				{/* </View>
				</TouchableNativeFeedback> */}
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
