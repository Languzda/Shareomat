import {Alert} from 'react-native';

const ip = process.env.IP;
const port = process.env.PORT;

export async function addCard(cardId: string, userId: string, token: string) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      card_id: cardId,
      user_id: userId,
    }),
  };

  try {
    await fetch(`http://${ip}:${port}/card/addCard`, requestOptions).then(
      response => {
        response.json().then(data => {
          if (data.message !== undefined) {
            if (data.message === 'card adding status') {
              Alert.alert('Card added succesfully');
            } else {
              Alert.alert('', data.message);
            }
          } else {
            Alert.alert('Error', data.errors[0].message);
          }
        });
      },
    );
  } catch (e: any) {
    console.error(e);
  }
}

export async function getUserCards(token: string, userId: string) {
  const response = await fetch(`http://${ip}:${port}/card/getUserCards/${userId}`, {
    headers: {

      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });

  const res = await response.json();

  return res.data.cards;
}
