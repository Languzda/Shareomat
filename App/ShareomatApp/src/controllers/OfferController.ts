import {Alert} from 'react-native';
import {AddOfferData} from '../types/AddOfferData';
import {OfferType} from '../types/OfferType.ts';

const ip = process.env.IP;
const port = process.env.PORT;

export async function getActiveOffers(token: string) {
  const response = await fetch(`http://${ip}:${port}/offer/getActiveOffers`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function getOfferById(
  id: number,
  token: string,
): Promise<OfferType> {
  const response = await fetch(
    `http://${ip}:${port}/offer/getOfferById/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return await response.json();
}

export async function addOffer(token: string, data: AddOfferData) {
  const formData = new FormData();

  let key: keyof AddOfferData;
  for (key in data) {
    formData.append(key, data[key]);
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    await fetch(`http://${ip}:${port}/offer/addOfferWithPhoto`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(formData),
    }).then(response => {
      response.json().then(data => {
        console.log(data);
        if (data.errors === undefined) {
          Alert.alert(data.message);
        } else {
          Alert.alert('Error', data.errors[0].context.errors[0].msg);
        }

        return response.json();
      });
    });
  } catch (e: any) {
    console.error(e);

    return 'EERRORR: ' + e;
  }
}
