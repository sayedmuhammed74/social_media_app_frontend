import Cookies from 'js-cookie';
import { url } from '../url';

export const getAPIData = async (api) => {
  try {
    const res = await fetch(url + api, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${Cookies.get('jwt')}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const postAPIData = async (api, form) => {
  try {
    const res = await fetch(url + api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Cookies.get('jwt')}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateAPIData = async (api, body) => {
  try {
    const res = await fetch(url + api, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Cookies.get('jwt')}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteAPIData = async (api) => {
  try {
    const res = await fetch(url + api, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Cookies.get('jwt')}`,
      },
    });
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      throw new Error(data.message);
    }
    return;
  } catch (err) {
    throw new Error(err);
  }
};

export const addNotification = (
  userId,
  type,
  referenceId,
  referenceType,
  socket
) => {
  // Handle Sending Notifications
  postAPIData('/api/v1/notifications', {
    userId,
    type,
    referenceId,
    referenceType,
  })
    .then((res) =>
      socket?.emit('handleNotification', {
        notification: res.data.notification,
      })
    )
    .catch((err) => console.log(err));
};
