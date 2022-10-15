import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function AddEventComponent() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleTitleChange = (text) => {
		setTitle(text);
	};

	const handleContentChange = (text) => {
		setContent(text);
	};

	const handleCreateEvent = () => {};

	return (
		<View
			style={{
				backgroundColor: 'white',
				height: Dimensions.get('window').height * 0.6,
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
			<TextInput
				value={title}
				mode='outlined'
				label={'title'}
				onChange={handleTitleChange}
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
				onChange={handleContentChange}
				style={{
					width: Dimensions.get('window').width * 0.8,
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
