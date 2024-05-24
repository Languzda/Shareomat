import { useContext } from "react";
import { AuthContext, authContextType } from "../store/authContext";

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