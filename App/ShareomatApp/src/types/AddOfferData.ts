import { Asset } from "react-native-image-picker";

export type AddOfferData = {
  name: string, 
  type: string, 
  description: string, 
  limit: string, 
  price: number, 
  card_id: number, 
  status: string,
  image: Asset
};