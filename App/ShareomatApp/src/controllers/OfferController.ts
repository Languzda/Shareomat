import {Alert, Platform} from 'react-native';
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

export async function useOffer(offer_id: string, token: string) {
  const response = await fetch(
    `http://${ip}:${port}/offer/useOfferById/${offer_id}`,
    {
      method: "put",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return await response.json()
}

export async function addOffer(token: string, data: AddOfferData) {
  const formData = new FormData();

  let key: keyof AddOfferData;
  console.log('data', data.image);
  for (key in data) {
    formData.append(key, data[key]);
  }

  const photo = data.image;

  formData.append('photo', {
    name: photo!.fileName,
    type: photo!.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  console.log('form', formData);

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(
      `http://${ip}:${port}/offer/addOfferWithPhoto`,
      {
        method: 'POST',
        headers: headers,
        body: formData,
      },
    );

    const data = await response.json();

    if (data.errors === undefined) {
      Alert.alert(data.message);
    } else {
      Alert.alert('Error', data.errors[0].context.errors[0].msg);
    }

  } catch (e: any) {
    console.error(e);

    return 'ERROR: ' + e;
  }
}
