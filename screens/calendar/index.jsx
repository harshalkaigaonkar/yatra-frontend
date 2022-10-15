import React, { useEffect, useState } from 'react';
import {
	View,
	TouchableOpacity,
	Dimensions,
	TouchableNativeFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar, Button, Text, Modal } from 'react-native-paper';
import Header from '../../components/header';
import ModalComponent from '../../components/modal/modal';

const timeToString = (time) => {
	const date = new Date(time);
	return date.toISOString().split('T')[0];
};

const Schedule = ({ route, navigation }) => {
	const [items, setItems] = useState({});
	const [date, setDate] = useState(new Date());
	const [visble, setVisible] = useState(false);
	const [eventModalVisible, setEventModalVisible] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const showModal = () => setVisible(true);
	const showEventModal = () => setEventModalVisible(true);
	const hideModal = () => setVisible(false);
	const hideEventModal = () => setEventModalVisible(false);

	useEffect(() => {});

	const loadItems = (day) => {
		setTimeout(() => {
			for (let i = -15; i < 85; i++) {
				const time = day.timestamp + i * 24 * 60 * 60 * 1000;
				const strTime = timeToString(time);
				if (!items[strTime]) {
					items[strTime] = [];
					const numItems = Math.floor(Math.random() * 3 + 1);
					for (let j = 0; j < numItems; j++) {
						items[strTime].push({
							name: 'Item for ' + strTime + ' #' + j,
							height: Math.max(50, Math.floor(Math.random() * 150)),
						});
					}
				}
			}
			const newItems = {};
			Object.keys(items).forEach((key) => {
				newItems[key] = items[key];
			});
			setItems([
				{
					type: 'Add event',
				},
				...newItems,
			]);
		}, 1000);
	};

	const renderItem = (item) => {
		return (
			<TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
				<Card>
					<Card.Content>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							{item.type === 'Add event' ? (
								<Button
									icon='plus'
									mode='contained'
									onPress={() => {
										showModal();
									}}
								>
									<Text>Add event</Text>
								</Button>
							) : (
								<>
									<Text>{item.name}</Text>
									<Avatar.Text label='J' />
								</>
							)}
						</View>
					</Card.Content>
				</Card>
			</TouchableOpacity>
		);
	};

	const handleCreateLog = () => {};

	return (
		<View style={{ flex: 1 }}>
			<Header route={route} navigation={navigation} />
			<View
				style={{
					width: Dimensions.get('window').width,
					backgroundColor: 'white',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingLeft: 18,
					paddingRight: 18,
				}}
			>
				<Text variant='titleLarge'>My Travel Log</Text>
				<TouchableNativeFeedback>
					<Button
						onPress={showModal}
						icon='plus'
						mode='elevated'
						buttonColor='white'
						style={{
							backgroundColor: '#fff',
							margin: 10,
							width: 100,
							borderWidth: 2,
							borderColor: '#CF9FFF',
							borderRadius: 30,
							height: 45,
						}}
					>
						New
					</Button>
				</TouchableNativeFeedback>
			</View>
			<Agenda
				items={items}
				loadItemsForMonth={loadItems}
				selected={new Date().toISOString().split('T')[0]}
				renderItem={renderItem}
				showClosingKnob={true}
				showScrollIndicator={true}
				markingType='period'
				markedDates={{
					'2022-10-15': {
						startingDay: true,
						color: '#70d7c7',
						textColor: 'white',
					},
					'2022-10-16': {
						color: '#70d7c7',
						textColor: 'white',
						endingDay: true,
					},
					'2022-10-17': {
						color: '#70d7c7',
						textColor: 'white',
						marked: true,
						dotColor: 'white',
						startingDay: true,
					},
					'2022-10-18': { color: '#70d7c7', textColor: 'white' },
					'2022-10-19': {
						endingDay: true,
						color: '#50cebb',
						textColor: 'white',
					},
				}}
			/>
			<ModalComponent visible={visble} hideModal={hideModal}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 20,
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
					<Button onPress={() => setShowDatePicker(true)}>Select date</Button>
				</View>
				{showDatePicker && (
					<DateTimePicker
						testID='dateTimePicker'
						value={date}
						mode={'date'}
						onChange={(event, selectedDate) => {
							const currentDate = selectedDate;
							setShow(false);
							setDate(currentDate);
						}}
					/>
				)}
				<Button
					style={{
						backgroundColor: '#CF9FFF',
					}}
					onPress={handleCreateLog}
				>
					<Text
						style={{
							color: 'white',
						}}
					>
						Confirm
					</Text>
				</Button>
			</ModalComponent>
			<ModalComponent visible={eventModalVisible} hideModal={hideEventModal}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 20,
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
				</View>
			</ModalComponent>
		</View>
	);
};

export default Schedule;
