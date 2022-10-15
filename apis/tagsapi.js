import { baseUrl } from "./constants";

export const getTags = async (accessToken) => {
	const data = await fetch(`${baseUrl}/tag`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		},
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((error) => {
			return {
        error: true,
				msg: 'An error occurred',
				type: 'error',
			};
		});
	return data;
};

export const createTag = async (accessToken, name) => {
	const data = await fetch(`${baseUrl}/tag/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			name,
		}),
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((error) => {
			return {
				msg: 'An error occurred',
				type: 'error',
			};
		});
	return data;
};
