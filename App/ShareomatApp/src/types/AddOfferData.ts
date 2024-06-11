import { Asset } from "react-native-image-picker";

export type AddOfferData = {
  name: string, 
  type: string, 
  description: string, 
  limit: number, 
  price: number, 
  photo: string | undefined,
  card_id: string,
  status: string,
  image: Asset | undefined
};