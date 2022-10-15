import { FontAwesome } from '@expo/vector-icons';
import { Text, TextInput, Button } from 'react-native-paper';
import React from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { register } from '../../apis/authapis';

export default function Register({ navigation }) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
	const [errors, setErrors] = React.useState({
		username: '',
		password: '',
		confirmPassword: '',
	});

	const handleChangeUsername = (text) => {
		setUsername(text);
		setErrors({ ...errors, username: '' });
	};

	const handleChangePassword = (text) => {
		setPassword(text);
		setErrors({ ...errors, password: '' });
	};

	const handleChangeConfirmPassword = (text) => {
		setConfirmPassword(text);
		if (text !== password) {
			setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
		} else {
			setErrors({ ...errors, confirmPassword: '' });
		}
	};

	const handleSubmit = async (event) => {
		if (!username) {
			setErrors({ ...errors, username: 'Username is required' });
			return;
		}
		if (!password) {
			setErrors({ ...errors, password: 'Password is required' });
			return;
		}
		if (!confirmPassword) {
			setErrors({ ...errors, confirmPassword: 'Confirm password is required' });
			return;
		}
		const data = await register(username, password).then(async () => {
			await SecureStore.setItemAsync(
				'pass-store',
				JSON.stringify({ username, password })
			);
		}).catch(() => {
			setErrors({ ...errors, username: 'Username already exists' });
		});

		setUsername('');
		setPassword('');
		setConfirmPassword('');

		navigation.navigate('Home');
	};

	return (
		<View
			style={{
				flexGrow: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<TextInput
				value={username}
				placeholder='Username'
				onChangeText={handleChangeUsername}
				style={{
					margin: 10,
					borderWidth: 0,
					width: '100%',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.75,
					shadowRadius: 3,
					elevation: 9,
					padding: 10,
				}}
			/>
			{!!errors.username && (
				<Text
					style={{
						color: 'red',
						fontSize: 12,
						alignSelf: 'flex-start',
						position: 'relative',
						bottom: 10,
						left: 20,
					}}
				>
					{errors.username}
				</Text>
			)}
			<TextInput
				value={password}
				textContentType='password'
				secureTextEntry={!isPasswordVisible}
				caretHidden
				placeholder='Password'
				onChangeText={handleChangePassword}
				accessoryRight={
					isPasswordVisible ? (
						<FontAwesome
							onPress={() => setIsPasswordVisible(false)}
							name='eye-slash'
							size={20}
						/>
					) : (
						<FontAwesome
							onPress={() => setIsPasswordVisible(true)}
							name='eye'
							size={20}
						/>
					)
				}
				style={{
					margin: 10,
					borderWidth: 0,
					width: '100%',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.75,
					shadowRadius: 3,
					elevation: 9,
					padding: 10,
				}}
			/>
			{!!errors.password && (
				<Text
					style={{
						color: 'red',
						fontSize: 12,
						alignSelf: 'flex-start',
						position: 'relative',
						bottom: 10,
						left: 20,
					}}
				>
					{errors.password}
				</Text>
			)}
			<TextInput
				value={confirmPassword}
				textContentType='password'
				secureTextEntry={!isPasswordVisible}
				caretHidden
				placeholder='Confirm password'
				onChangeText={handleChangeConfirmPassword}
				accessoryRight={
					isPasswordVisible ? (
						<FontAwesome
							onPress={() => setIsPasswordVisible(false)}
							name='eye-slash'
							size={20}
						/>
					) : (
						<FontAwesome
							onPress={() => setIsPasswordVisible(true)}
							name='eye'
							size={20}
						/>
					)
				}
				style={{
					margin: 10,
					borderWidth: 0,
					width: '100%',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.75,
					shadowRadius: 3,
					elevation: 9,
					padding: 10,
				}}
			/>
			{!!errors.confirmPassword && (
				<Text
					style={{
						color: 'red',
						fontSize: 12,
						alignSelf: 'flex-start',
						position: 'relative',
						bottom: 10,
						left: 20,
					}}
				>
					{errors.confirmPassword}
				</Text>
			)}
			<Button
				onPress={handleSubmit}
				style={{
					margin: 10,
					width: '80%',
					backgroundColor: '#2e64e5',
					borderRadius: 100,
				}}
			>
				<Text>Signup</Text>
			</Button>
			<View
				style={{
					flexDirection: 'row',
				}}
			>
				<Text>Already have an account? </Text>
				<Text
					style={{
						color: 'blue',
					}}
					onPress={() => navigation.navigate('Login')}
				>
					sign in
				</Text>
			</View>
		</View>
	);
}
