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

  const response = await fetch(`http://${ip}:${port}/offer/addOfferWithPhoto`, {
    method: 'POST',
    headers: headers,
    body: formData
  });

  return response.json();
}