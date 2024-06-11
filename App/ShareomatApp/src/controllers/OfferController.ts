import { Alert } from "react-native";
import { AddOfferData } from "../types/AddOfferData";

const ip = process.env.IP;
const port = process.env.PORT;

export async function getActiveOffers(token: string) {
  const response = await fetch(`http://${ip}:${port}/offer/getActiveOffers`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export async function getOfferById(id: number, token: string) {
  const response = await fetch(`http://${ip}:${port}/offer/getOfferById/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export async function addOffer(
  token: string,
  data: AddOfferData
) {
  const formData = new FormData();

  let key: keyof AddOfferData;
  for (key in data) {
    formData.append(key, data[key]);
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    await fetch(`http://${ip}:${port}/offer/addOffer`, {
      method: 'POST',
      headers: headers,
      //body: formData
      /*body: JSON.stringify({
        name: "test",
        type: "passwordowy",
        description: "descriptio",
        limit: 69, 
        price: 97.9, 
        photo: "rety",
        card_id: "99999992", 
        //card: "99999992",
        status: "string",
        image: undefined
      })*/
      body: JSON.stringify({
        name: data.name,
        type: data.type,
        description: data.description,
        limit: data.limit,
        price: data.price,
        photo: data.photo,
        card_id: data.card_id,
        status: data.status,
        image: data.image
      })
    })
      .then(response => {
        response.json()
          .then(data => {
            console.log(data);
            Alert.alert("problemino", data.token, data.message, data.newCard)

            if (data.errors === undefined) {
              Alert.alert(data.message)
            } else {
              Alert.alert("", data.errors[0].message)
            }

            return response.json();
          })
      })
  }
  catch (e: any) {
    console.error(e)

    return ("EERRORR: " + e)
  }
}
