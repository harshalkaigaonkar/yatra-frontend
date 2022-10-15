import { baseUrl } from "./constants";

export const getLogs = async (accessToken) => {
  const data = await fetch(`${baseUrl}/log/user`, {
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
        msg: 'An error occurred',
        type: 'error',
      };
    });
  return data;
}

export const createLog = async (accessToken, date, place) => {
  const data = await fetch(`${baseUrl}/log/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      date,
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
}