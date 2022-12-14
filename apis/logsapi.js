import { baseUrl, pexelsAPI } from './constants';

export const getLogs = async (accessToken) => {
	const data = await fetch(`${baseUrl}/log/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
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

export const createLog = async (accessToken, date, place) => {
	const data = await fetch(`${baseUrl}/log/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			date: new Date(date),
			place,
		}),
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

export const endLogRequest = async (accessToken, logId) => {
	const data = await fetch(`${baseUrl}/log/end/${logId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
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

export const getPlaces = async (accessToken) => {
	const data = await fetch(`${baseUrl}/log/places`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
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

export const getPlaceImg = async (place) => {
	const data = await fetch(`${pexelsAPI(place)}`, {
		method: 'GET',
		headers: {
			Authorization: `563492ad6f9170000100000161aa500f96024e9a91f368c795ae2b4a`,
		},
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((error) => {
			return {
				msg: 'An error occurred',
				type: 'error',
			};
		});
		// rate limit exceed ho rahi thi
		return data;
}

export const getLogsByPlace = async (accessToken, place) => {
	const data = await fetch(`${baseUrl}/log/place/${place}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
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

export const getLogsById = async (accessToken, logId) => {
	const data = await fetch(`${baseUrl}/log/unique/${logId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
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

export const createLogCopy = async (accessToken, days, perday, logId, date) => {
	const data = await fetch(`${baseUrl}/log/copy/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			days,
			perday,
			id: logId,
			date: new Date(date),
		}),
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
