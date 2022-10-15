import { FontAwesome } from '@expo/vector-icons';
import { Text, TextInput, Button } from 'react-native-paper';
import React from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { login } from '../../apis/authapis';
import { useAuth } from '../../contexts/AuthContext';

export default function Login({ navigation }) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
	const [errors, setErrors] = React.useState({
		username: '',
		password: '',
		invalid: false,
	});
	const { dispatch } = useAuth();

	React.useEffect(() => {
		SecureStore.getItemAsync('pass-store').then((data) => {
			console.log(data);
			if (data) {
				const { username, password } = JSON.parse(data);
				login(username, password).then((data) => {
					if (data.type === 'error' || data.msg) {
						SecureStore.deleteItemAsync('pass-store');
						setLoading(false);
					} else {
						dispatch({
							type: 'login',
							payload: {
								accessToken: data.accessToken,
								refreshToken: data.refreshToken,
							},
						});
						navigation.navigate('Home');
					}
				});
			}else{
				setLoading(false);
			}
		});
	}, []);

	const handleChangeUsername = (text) => {
		setUsername(text);
		setErrors({ ...errors, username: '', invalid: false });
	};

	const handleChangePassword = (text) => {
		setPassword(text);
		setErrors({ ...errors, password: '', invalid: false });
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
		const data = await login(username, password);
		console.log("the data from here", data);
		if (data.type === 'error' || data.msg) {
			setErrors({ ...errors, invalid: true });

			// delete cuurent value from the store
			SecureStore.deleteItemAsync('pass-store');
			return;
		}
		await SecureStore.setItemAsync(
			'pass-store',
			JSON.stringify({ username, password }),
		);
		dispatch({
			type: 'login',
			payload: {
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
			},
		});
		setUsername('');
		setPassword('');
		setErrors({
			username: '',
			password: '',
			invalid: false,
		});
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
			{!!errors.invalid && (
				<Text
					style={{
						color: 'red',
						fontSize: 16,
						position: 'relative',
						left: 10,
						alignSelf: 'flex-start',
					}}
				>
					Invalid username or password
				</Text>
			)}
			{loading ? (
				<Text>Loading</Text>
			) : (
				<>
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
					<Button
						onPress={handleSubmit}
						style={{
							margin: 10,
							width: '80%',
							borderWidth: 0,
							backgroundColor: '#2e64e5',
							borderRadius: 100,
						}}
					>
						<Text>Login</Text>
					</Button>
					<View
						style={{
							flexDirection: 'row',
						}}
					>
						<Text>Don't have an account? </Text>
						<Text
							style={{
								color: 'blue',
							}}
							onPress={() => navigation.navigate('Register')}
						>
							sign up
						</Text>
					</View>
				</>
			)}
		</View>
	);
}
