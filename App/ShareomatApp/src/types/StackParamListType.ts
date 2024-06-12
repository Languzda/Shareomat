import {OfferType} from './OfferType.ts';

export type StackParamListType = {
  OfferList: undefined;

  OfferView: {offer: OfferType};
  AddOffer: undefined;
  Barcode: {id: string | undefined};
};
