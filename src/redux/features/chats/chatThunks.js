import Cookies from 'js-cookie';
import { url } from '../../../url';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_CHATS = 'chats/fetchChats';

export const fetchChats = createAsyncThunk(FETCH_CHATS, async () => {
  try {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch(`${url}/api/v1/conversations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
    });
    const json = await res.json();

    return json;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

// export const sendMessage = createAsyncThunk(
//   'chat/sendMessage',
//   async (chatId, body) => {
//     const token = `Bearer ${Cookies.get('jwt')}`;
//     const res = await fetch(`${url}/api/v1/conversations/${chatId}/messages`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'Application/json',
//         authorization: token,
//       },
//       body: JSON.stringify(body),
//     });

//     if (!res.ok) {
//       const json = await res.json();
//       throw new Error(json.message);
//     }
//     const json = await res.json();

//     return json;
//   }
// );
