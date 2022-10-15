import { baseUrl } from "./constants";

export const getEvents = async (accessToken) => {
  const data = await fetch(`${baseUrl}/event`, {
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
}