import React, { useEffect, useState } from 'react';
import {
	View,
	TouchableOpacity,
	Dimensions,
	TouchableNativeFeedback,
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Button, Text, Paragraph } from 'react-native-paper';
import Header from '../../components/header';
import { BottomSheet } from 'react-native-btr';
import AddEventComponent from '../../components/event/addEventComponent';
import { getLogs, getLogsById } from '../../apis/logsapi';
import { useAuth } from '../../contexts/AuthContext';

const OtherLog = ({ route, navigation }) => {
	const [items, setItems] = useState({});
	const [logDetails, setLogDetails] = useState({});
	const [toggle, setToggle] = useState('dot');
	const [activeLogId, setActiveLogId] = useState('');
	const [visble, setVisible] = useState(false);
	const [markedDates, setMarkedDates] = useState({});
	const [date, setDate] = useState(
		new Date(route.params.startDate).toISOString().split('T')[0]
	);
	const [eventModalVisible, setEventModalVisible] = useState(false);
	const showModal = () => setVisible(true);
	const showEventModal = () => setEventModalVisible(true);

	const { state } = useAuth();

	const { logId } = route.params;

	const loadItems = async (day) => {
		const fetchedLog = await getLogsById(state.accessToken, logId);
		// console.log(fetchedLog);
		if (fetchedLog.error) return;
		const newItems = {};
		fetchedLog.events.forEach((event) => {
			if (event.date === new Date().toISOString().split('T')[0]) {
				event['type'] = 'add-event';
			}
			event['logId'] = logId;
			if (newItems[event.date.split('T')[0]]) {
				newItems[event.date.split('T')[0]] = [
					...newItems[event.date.split('T')[0]],
					event,
				];
			} else {
				newItems[event.date.split('T')[0]] = [event];
			}
		});
		const dates = {};
		if (!fetchedLog) return;
		const start = new Date(fetchedLog.startDate);
		const end = new Date(fetchedLog.endDate);

		dates[fetchedLog.startDate.split('T')[0]] = {
			startingDay: true,
			color: 'black',
			textColor: 'white',
		};
		let i = new Date(start);
		i = new Date(i.setDate(i.getDate() + 1));
		while (i < end) {
			dates[i.toISOString().split('T')[0]] = {
				color: 'black',
				textColor: 'white',
			};
			if (!newItems[i.toISOString().split('T')[0]]) {
				newItems[i.toISOString().split('T')[0]] = [
					{
						title: 'No events',
						type: 'placeholder',
					},
				];
			}
			let newDate = i.setDate(i.getDate() + 1);
			i = new Date(newDate);
		}

		if (!newItems[fetchedLog.endDate.split('T')[0]]) {
			newItems[fetchedLog.endDate.split('T')[0]] = [
				{
					title: 'No events',
					type: 'placeholder',
				},
			];
		}

		dates[fetchedLog.endDate.split('T')[0]] = {
			endingDay: true,
			color: 'black',
			textColor: 'white',
		};
		// console.log('dates', dates);
		console.log('newItems', newItems);
		setItems(JSON.parse(JSON.stringify(newItems)));
		setMarkedDates(dates);
	};

	useEffect(() => {
		loadItems();
	}, []);

	const renderItem = (item) => {
		return (
			<View>
				<TouchableOpacity style={{ marginRight: 10, marginTop: 20 }}>
					<Card>
						<Card.Content>
							<Paragraph>{item.title}</Paragraph>
							<Paragraph>{item?.content && item.content}</Paragraph>
						</Card.Content>
					</Card>
				</TouchableOpacity>
			</View>
		);
	};

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
					<Text variant='titleLarge'>{route.params.username} log</Text>
					<TouchableNativeFeedback>
						<Button
							onPress={() => {}}
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
							Copy
						</Button>
					</TouchableNativeFeedback>
				</View>
				<Agenda
					style={{
						borderTopWidth: 1,
						borderColor: 'whitesmoke',
					}}
					items={items}
					renderItem={renderItem}
					showScrollIndicator={true}
					// selected={date}
					minDate={route.params.startDate}
					maxDate={route.params.endDate}
					theme={{
						agendaKnobColor: 'black',
						selectedDayBackgroundColor: 'purple',
						selectedDayColor: 'red',
						agendaKnobHeight: 10,
						textDayMargin: 1,
					}}
					markingType={'period'}
					markedDates={markedDates}
					pastScrollRange={50}
				/>
			</View>
			{/* <BottomSheet
				visible={eventModalVisible}
				onBackButtonPress={hideEventModal}
				onBackdropPress={hideEventModal}
			>
				<AddEventComponent
					handleClose={hideEventModal}
					activeLogId={activeLogId}
				/>
			</BottomSheet> */}
		</>
	);
};

export default OtherLog;
