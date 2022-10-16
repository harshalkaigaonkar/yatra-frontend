import React, { useEffect, useState } from 'react';
import {
	View,
	TouchableOpacity,
	Dimensions,
	TouchableNativeFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Agenda } from 'react-native-calendars';
import {
	Card,
	Avatar,
	Button,
	Text,
	Modal,
	Title,
	Paragraph,
} from 'react-native-paper';
import Header from '../../components/header';
import ModalComponent from '../../components/modal/modal';
import { BottomSheet } from 'react-native-btr';
import AddEventComponent from '../../components/event/addEventComponent';
import { endLogRequest, getLogs } from '../../apis/logsapi';
import { useAuth } from '../../contexts/AuthContext';
import CreateLogComponent from '../../components/logs/createlogcomponent';

const timeToString = (time) => {
	const date = new Date(time);
	return date.toISOString().split('T')[0];
};

const Schedule = ({ route, navigation }) => {
	const [items, setItems] = useState({});
	const [logs, setLogs] = useState([]);
	const [_, refresh] = useState(0);
	const [toggle, setToggle] = useState('dot');
	const [activeLogId, setActiveLogId] = useState('');
	const [visble, setVisible] = useState(false);
	const [markedDates, setMarkedDates] = useState({});
	const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
	const [eventModalVisible, setEventModalVisible] = useState(false);
	const showModal = () => setVisible(true);
	const showEventModal = () => setEventModalVisible(true);
	const hideModal = () => setVisible(false);
	const hideEventModal = () => setEventModalVisible(false);

	const { state } = useAuth();

	const loadItems = async (day) => {
		const fetchedLogs = await getLogs(state.accessToken);
		setLogs(fetchedLogs);
		if (fetchedLogs.error) return;
		const newItems = {};
		fetchedLogs.forEach((data) => {
			if (
				data.startDate.split('T')[0] <=
					new Date().toISOString().split('T')[0] &&
				(!data.endDate ||
					(data.endDate &&
						data.endDate.split('T')[0] >=
							new Date().toISOString().split('T')[0]))
			) {
				console.log('here');
				newItems[new Date().toISOString().split('T')[0]] = [
					{
						type: 'add-event',
						tittle: 'Add Event',
						logId: data.id,
					},
				];
			}
			data.events.forEach((event) => {
				if (event.date === new Date().toISOString().split('T')[0]) {
					event['type'] = 'add-event';
				}
				event['logId'] = data.id;
				if (newItems[event.date.split('T')[0]]) {
					newItems[event.date.split('T')[0]] = [
						...newItems[event.date.split('T')[0]],
						event,
					];
				} else {
					newItems[event.date.split('T')[0]] = [event];
				}
			});
		});
		setItems(newItems);
		const dates = {};
		if (fetchedLogs.length) {
			fetchedLogs.forEach((data) => {
				const start = new Date(data.startDate);
				const end = new Date(data.endDate);

				dates[data.startDate.split('T')[0]] = {
					startingDay: true,
					color: 'black',
					textColor: 'white',
				};
				if (!newItems[data.startDate.split('T')[0]]) {
					newItems[data.startDate.split('T')[0]] = [
						{
							title: 'No Events',
						},
					];
				}
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
								title: 'No Events',
							},
						];
					}
					let newDate = i.setDate(i.getDate() + 1);
					i = new Date(newDate);
				}

				if (data.endDate) {
					dates[data.endDate.split('T')[0]] = {
						endingDay: true,
						color: 'black',
						textColor: 'white',
					};
				}
			});
		} else {
			newItems[new Date().toISOString().split('T')[0]] = [
				{
					title: 'No events',
				},
			];
		}
		if (!newItems[new Date().toISOString().split('T')[0]]) {
			newItems[new Date().toISOString().split('T')[0]] = [
				{
					title: 'No events',
				},
			];
		}
		// console.log('dates', dates);
		// console.log('newITems', JSON.parse(JSON.stringify(newItems)));
		setItems(newItems);
		setMarkedDates(dates);
	};

	useEffect(() => {
		loadItems();
	}, [_]);

	const renderItem = (item) => {
		return (
			<View>
				<TouchableOpacity style={{ marginRight: 10, marginTop: 20 }}>
					{item?.type && item.type === 'add-event' ? (
						<Button
							icon='plus'
							mode='contained'
							onPress={() => {
								setActiveLogId(item.logId);
								showEventModal();
							}}
							style={{
								width: 'auto',
								marginRight: 10,
								marginTop: 17,
								marginBottom: 30,
							}}
						>
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
					) : (
						<Card>
							<Card.Content>
								<Paragraph>{item.title}</Paragraph>
								<Paragraph>{item?.content && item.content}</Paragraph>
							</Card.Content>
						</Card>
					)}
				</TouchableOpacity>
			</View>
		);
	};

	const endLog = async () => {
		const res = await endLogRequest(state.accessToken, logs[0].id);
		if (res.error) return;
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
					<Text variant='titleLarge'>My Travel Log</Text>
					<TouchableNativeFeedback>
						<Button
							onPress={() => {
								showModal();
							}}
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
							{'Create'}
						</Button>
					</TouchableNativeFeedback>
				</View>
				<Agenda
					style={{
						borderTopWidth: 1,
						borderColor: 'whitesmoke',
					}}
					items={items}
					selected={new Date().toISOString().split('T')[0]}
					renderItem={renderItem}
					showScrollIndicator={true}
					minDate={'2022-09-01'}
					maxDate={'2022-12-31'}
					theme={{
						agendaKnobColor: 'black',
						selectedDayBackgroundColor: 'purple',
						selectedDayColor: 'black',
						agendaKnobHeight: 10,
						textDayMargin: 1,
					}}
					// onDayPress={(data) => setDate(data.dateString)}
					// onDayLongPress={(data) => setDate(data.dateString)}
					onCalendarToggled={(enabled) =>
						enabled ? setToggle('period') : setToggle('dot')
					}
					markingType={'period'}
					markedDates={markedDates}
					pastScrollRange={50}
				/>
			</View>
			<BottomSheet
				visible={eventModalVisible}
				onBackButtonPress={hideEventModal}
				onBackdropPress={hideEventModal}
			>
				<AddEventComponent
					refresh={refresh}
					handleClose={hideEventModal}
					activeLogId={activeLogId}
				/>
			</BottomSheet>
			<BottomSheet
				visible={visble}
				onBackButtonPress={hideModal}
				onBackdropPress={hideModal}
			>
				<CreateLogComponent refresh={refresh} hideModal={hideModal} />
			</BottomSheet>
		</>
	);
};

export default Schedule;
