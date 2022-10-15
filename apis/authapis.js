import { baseUrl } from './constants';

export const login = async (username, password) => {
	const data = await fetch(`${baseUrl}/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username,
			password,
		}),
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((error) => {
			console.log(`${baseUrl}/user/login`);
			console.error(error);
			return {
				msg: 'An error occurred',
				type: 'error',
			};
		});
	return data;
};

export const register = async (
	username,
	password,
) => {
	const data = await fetch(`${baseUrl}/user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username,
			password
		}),
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((error) => ({
			msg: 'An error occurred',
		}));

	return data;
};

export const logout = async () => {
	const data = await fetch(`${baseUrl}/user/logout`)
		.then((res) => res.json())
		.then((data) => data)
		.catch((error) => ({
			msg: 'An error occurred',
		}));

	return data;
};
