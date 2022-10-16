import { useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createLog, createLogCopy } from '../../apis/logsapi';
import { useAuth } from '../../contexts/AuthContext';
import { Button, TextInput } from 'react-native-paper';

export default function CreateCopyComponent({ hideModal, logId }) {
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const { state } = useAuth();
	const [days, setDays] = useState('');
	const [perday, setPerDay] = useState('');
	const [error, setError] = useState('');

	const handleDaysChange = (text) => {
		setDays(text);
	};

	const handlePerDayChange = (text) => {
		setPerDay(text);
	};

	const handleCreateLog = () => {
		// check for place
		if (days === '') {
			setError('Please enter number of days');
			return;
		}

    if(perday === ''){
      setError('Please enter number of events per day');
      return;
    }

		createLogCopy(state.accessToken, days, perday, logId, date).then((data) => {
			if (data.error) {
				setError('an error occured');
				return;
			}
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
				value={days}
				keyboardType='numeric'
				mode='outlined'
				label={'days'}
				onChangeText={handleDaysChange}
				style={{
					marginBottom: 20,
				}}
			/>
			<TextInput
				value={perday}
				keyboardType='numeric'
				mode='outlined'
				label={'events per day'}
				onChangeText={handlePerDayChange}
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
