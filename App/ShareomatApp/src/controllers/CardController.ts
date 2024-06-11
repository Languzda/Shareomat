import { Alert } from "react-native";

const ip = process.env.IP;
const port = process.env.PORT;

export async function addCard(cardId: string, userId: string, token: string) {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      card_id: cardId,
      user_id: userId
    })
  }

  try {
    await fetch(
      `http://${ip}:${port}/card/addCard`, requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            console.log(data);
            Alert.alert("problemino", " " + data.token + " " + data.message + " " + data.newCard)
          })
      })
  }
  catch (e: any) {
    console.error(e)
  }
}

export async function getUserCards(token: string) {
  const response = await fetch(`http://${ip}:${port}/card/getUserCards`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}
