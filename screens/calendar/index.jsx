import React, { useEffect, useState } from 'react';
import {
	View,
	TouchableOpacity,
	Dimensions,
	TouchableNativeFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar, Button, Text, Modal, Title, Paragraph } from 'react-native-paper';
import Header from '../../components/header';
import ModalComponent from '../../components/modal/modal';
import { BottomSheet } from 'react-native-btr';
import AddEventComponent from '../../components/event/addEventComponent';
import { getLogs } from '../../apis/logsapi';
import { useAuth } from '../../contexts/AuthContext';
import CreateLogComponent from '../../components/logs/createlogcomponent';

const timeToString = (time) => {
	const date = new Date(time);
	return date.toISOString().split('T')[0];
};

const Schedule = ({ route, navigation }) => {
	const [items, setItems] = useState({});
	const [logs, setLogs] = useState([]);
	const [toggle, setToggle] = useState('dot');
	const [visble, setVisible] = useState(false);
	const [markedDates, setMarkedDates] = useState({});
	const [date, setDate] = useState(new Date().toISOString().split('T')[0])
	const [eventModalVisible, setEventModalVisible] = useState(false);
	const showModal = () => setVisible(true);
	const showEventModal = () => setEventModalVisible(true);
	const hideModal = () => setVisible(false);
	const hideEventModal = () => setEventModalVisible(false);

	const { state } = useAuth();

	useEffect(() => {
		getLogs(state.accessToken).then((data) => {
			setLogs(data);
		});
		
	}, []);

	const json = [
		{
			startDate: '2022-10-12',
			endDate: '2022-10-14',
			events: [
				{
					date: '2022-10-12',
					headline: 'Hello, Here.',
				},
				{
					date: '2022-10-12',
					headline: 'Hello, Here 2.',
				},
				{
					date: '2022-10-13',
					headline: 'Hello, Here 3.',
				},
			],
		},
		{
			startDate: '2022-10-01',
			endDate: '2022-10-03',
			events: [
				{
					date: '2022-10-01',
					headline: 'Hello, Here.',
				},
				{
					date: '2022-10-02',
					headline: 'Hello, Here 2.',
				},
				{
					date: '2022-10-03',
					headline: 'Hello, Here 3.',
				},
			],
		},
		{
			startDate: '2022-10-15',
			endDate: '2022-10-16',
			events: [
				{
					date: '2022-10-15',
					headline: 'Hello, Here.',
				},
				{
					date: '2022-10-15',
					headline: 'Hello, Here 2.',
				},
				{
					date: '2022-10-16',
					headline: 'Hello, Here 3.',
				},
			],
		},
	];

	const markedDatesFunc = () => {
		const dates = {};
		if(!logs.length)
		json.forEach((data) => {
				const start = new Date(data.startDate);
				const end = new Date(data.endDate);

			dates[data.startDate] = {
				startingDay: true,
				color: 'black',
				textColor: 'white',
			};
			let i = new Date(start);
			i= new Date(i.setDate(i.getDate() + 1))
			while(i < end) {
				dates[i.toISOString().split("T")[0]] = {
					color: 'black',
					textColor: 'white',
				};
				let newDate = i.setDate(i.getDate() + 1);
  		i = new Date(newDate);
			}

			dates[data.endDate] = {
				endingDay: true,
				color: 'black',
				textColor: 'white',
			};
		});
		setMarkedDates(dates);
	};

	const handleCreateLog = () => {};

	const loadItems = (day) => {
		const newItems = {};
		for (let i = -15; i < 85; i++) {
			const time = day.timestamp + i * 24 * 60 * 60 * 1000;
			const strTime = timeToString(time);
			if (!items[strTime]) {
					items[strTime] = [];
					const numItems = Math.floor(Math.random() * 3 + 1);
					for (let j = 0; j < numItems; j++) {
							items[strTime].push({

							});
					}
					json.forEach((data) => {
						data.events.forEach((event) => {
							event["type"] = 'add-event'
							items[event.date] = [event]
						})
					})
			}
	}
	Object.keys(items).forEach((key) => {
			newItems[key] = items[key];
	});
		console.log(newItems)
		setItems(newItems);
		const dates = {};
		if(!logs.length)
		json.forEach((data) => {
				const start = new Date(data.startDate);
				const end = new Date(data.endDate);

			dates[data.startDate] = {
				startingDay: true,
				color: 'black',
				textColor: 'white',
			};
			let i = new Date(start);
			i= new Date(i.setDate(i.getDate() + 1))
			while(i < end) {
				dates[i.toISOString().split("T")[0]] = {
					color: 'black',
					textColor: 'white',
				};
				let newDate = i.setDate(i.getDate() + 1);
  		i = new Date(newDate);
			}

			dates[data.endDate] = {
				endingDay: true,
				color: 'black',
				textColor: 'white',
			};
		});
		setMarkedDates(dates);
	};

	const renderItem = (item) => {
		return (
			<View>
				<TouchableOpacity style={{ marginRight: 10, marginTop: 20 }}>
				<Card>
					<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
					<Card.Content>
							<Paragraph>{item.headline}</Paragraph>
					</Card.Content>
			</Card>
				</TouchableOpacity>
				<Button icon='plus' mode='contained' onPress={showEventModal} style={{
					width: "auto",
					marginRight: 10,
					marginTop: 17,
					marginBottom: 30,
				}}>
						<Text
							style={{
								color: 'white',
								height: 10,
								fontSize: 10,
							}}
						>
							Add Event
						</Text>
					</Button>
					<View style={{width: "100%", borderWidth: 1, borderColor: 'gray'}} />
			</View>
		);
	};
	console.log(toggle)

	return (
		<>
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
					style={{
						borderTopWidth: 1,
						borderColor: 'whitesmoke'
					}}
					items={items}
					loadItemsForMonth={loadItems}
					selected={date}
					renderItem={renderItem}
					showScrollIndicator={true}
					minDate={'2022-01-01'}
					maxDate={'2022-12-31'}
					theme={{
						agendaKnobColor: 'black',
						selectedDayBackgroundColor: 'purple',
						selectedDayColor: 'white',
						agendaKnobHeight: 10,
						textDayMargin: 1,
					}}
					onDayPress={(data) => setDate(data.dateString)}
					onDayLongPress={(data) => console.log(data)}
					onCalendarToggled={(enabled) => enabled ? setToggle('period') : setToggle('dot')}
					markingType={toggle}
					markedDates={markedDates}
					pastScrollRange={50}
				/>
			</View>
			<BottomSheet
				visible={eventModalVisible}
				onBackButtonPress={hideEventModal}
				onBackdropPress={hideEventModal}
			>
				<AddEventComponent />
			</BottomSheet>
			<BottomSheet
				visible={visble}
				onBackButtonPress={hideModal}
				onBackdropPress={hideModal}
			>
				<CreateLogComponent hideModal={hideModal} />
			</BottomSheet>
		</>
	);
};

export default Schedule;
