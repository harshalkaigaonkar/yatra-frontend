import { useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createLog } from '../../apis/logsapi';
import { useAuth } from '../../contexts/AuthContext';
import { Button, TextInput } from 'react-native-paper';

export default function CreateLogComponent({ hideModal }) {
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const { state } = useAuth();
	const [place, setPlace] = useState('');
	const [error, setError] = useState('');

	const handlePlaceChange = (text) => {

		setPlace(text);
	};

	const handleCreateLog = () => {
		// check for place
		if (place === '') {
			setError('Please enter a place');
			return;
		}

		createLog(state.accessToken, date, place).then((data) => {
			if (data.error) {
				setError('an error occured');
				return;
			}
			console.log(data);
			hideModal();
		});
	};

	return (
		<View
			style={{
				backgroundColor: 'white',
				padding: 20,
				height: Dimensions.get('window').height / 2.5,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 25,
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
						textAlign: 'center',
					}}
				>
					Start from:{' '}
				</Text>
				<Text>{date.toLocaleDateString('en-GB')}</Text>
				<Button onPress={() => setShowDatePicker(true)}>Select date</Button>
			</View>
			<TextInput
				value={place}
				mode='outlined'
				label={'destination'}
				onChangeText={handlePlaceChange}
        style={{
          marginBottom: 20,
        }}
			/>
			{!!showDatePicker && (
				<DateTimePicker
					testID='dateTimePicker'
					value={date}
					mode={'date'}
					onChange={(event, selectedDate) => {
						const currentDate = selectedDate;
						setShowDatePicker(false);
						setDate(currentDate);
					}}
				/>
			)}
			<Button
				mode
				onPress={handleCreateLog}
				style={{
					backgroundColor: '#CF9FFF',
				}}
			>
				Confirm
			</Button>
		</View>
	);
}
