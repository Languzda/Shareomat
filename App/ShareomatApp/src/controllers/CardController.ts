import { Alert } from "react-native";

const ip = process.env.IP;
const port = process.env.PORT;

export async function addCard(cardId: string, token: string) {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      card_id: cardId
    })
  }

  try {
    await fetch(
      `http://${ip}:${port}/card/addCard`, requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            Alert.alert(data.message)
          })
      })
  }
  catch (e: any) {
    console.error(e)
  }
}
