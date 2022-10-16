import { baseUrl } from './constants';

export const getEvents = async (accessToken, selectedPlace, selectedTag) => {
	let query =
		selectedPlace !== 'select' ? `?destination=${selectedPlace}` : '';
  if(query.length){
    query += selectedTag !== 'select' ? `&tags=${selectedTag}` : '';
  }else{
    query += selectedTag !== 'select' ? `?tags=${selectedTag}` : '';
  }
	const data = await fetch(`${baseUrl}/event${query}`, {
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

export const createEvent = async (accessToken, title, content, id, tagId) => {
	const data = await fetch(`${baseUrl}/event/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			title,
			content,
			id,
			tagId: tagId || null,
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
