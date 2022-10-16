import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { createEvent } from '../../apis/eventsapi';
import { getTags } from '../../apis/tagsapi';
import { useAuth } from '../../contexts/AuthContext';
import SelectDropdown from 'react-native-select-dropdown';

export default function AddEventComponent({ activeLogId, handleClose }) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [errors, setErrors] = useState('');
	const [tags, setTags] = useState([]);
	const [selectedTag, setSelectedTag] = useState('');

	const { state } = useAuth();

	useEffect(() => {
		getTags(state.accessToken).then((data) => {
			setTags(data);
		});
	}, []);

	const handleTitleChange = (text) => {
		setTitle(text);
	};

	const handleContentChange = (text) => {
		setContent(text);
	};

	const handleCreateEvent = async () => {
		if (!title) {
			setErrors('Title is required');
			return;
		}
		if (!content) {
			setErrors('Content is required');
			return;
		}
		if (!activeLogId) {
			setErrors('Log id is required');
			return;
		}
		const data = await createEvent(
			state.accessToken,
			title,
			content,
			activeLogId,
			selectedTag
		);
		if (data.type === 'error' || data.msg) {
			console.log(data.msg);
			setErrors(data.msg);
			return;
		}
		setContent('');
		setTitle('');
		handleClose();
	};

	return (
		<View
			style={{
				backgroundColor: 'white',
				height: Dimensions.get('window').height * 0.7,
				alignItems: 'center',
				padding: 20,
				paddingTop: 50,
			}}
		>
			<Text
				style={{
					fontSize: 24,
					fontWeight: 'bold',
					textAlign: 'center',
					marginBottom: 20,
				}}
			>
				Add Event
			</Text>
			{!!errors && (
				<Text
					style={{
						color: 'red',
						fontSize: 16,
					}}
				>
					{errors}
				</Text>
			)}
			<TextInput
				value={title}
				mode='outlined'
				label={'title'}
				onChangeText={handleTitleChange}
				style={{
					width: Dimensions.get('window').width * 0.8,
				}}
			/>
			<TextInput
				value={content}
				mode='outlined'
				label='content'
				numberOfLines={8}
				multiline
				onChangeText={handleContentChange}
				style={{
					width: Dimensions.get('window').width * 0.8,
				}}
			/>
			<SelectDropdown
				data={tags.map((tag) => tag.name)}
				onSelect={(selectedItem, index) => {
					setSelectedTag(tags[index].id);
				}}
				buttonStyle={{
					marginTop: 20,
					backgroundColor: '#fff',
					borderColor: '#000',
					borderWidth: 1,
					width: Dimensions.get('window').width * 0.8,
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
			<Button
				onPress={handleCreateEvent}
				mode='contained'
				style={{
					width: Dimensions.get('window').width * 0.8,
					marginTop: 20,
				}}
			>
				Add Event
			</Button>
		</View>
	);
}
