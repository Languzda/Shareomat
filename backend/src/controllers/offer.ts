import { Request, Response } from 'express';
import {
  addOfferToDB,
  getActiveOffersFromDB,
  getOffersByCardIdFromDB,
  getOfferByIdFromDB,
  updateToUsedOffer,
} from './dbControllers/offer';
import { validationResult } from 'express-validator';

// const dummyData = [
//   {
//     name: 'offer1',
//     type: 'type1',
//     description: 'description1',
//     limit: 1,
//     price: 5.99,
//     photo: 'photo1',
//     card_id: 1,
//     status: 'active',
//   },
//   {
//     name: 'offer2',
//     type: 'type2',
//     description: 'description2',
//     limit: 2,
//     price: 6.99,
//     photo: 'photo2',
//     card_id: 2,
//     status: 'active',
//   },
//   {
//     name: 'offer3',
//     type: 'type3',
//     description: 'description3',
//     limit: 3,
//     price: 7.99,
//     photo: 'photo3',
//     card_id: 3,
//     status: 'active',
//   },
//   {
//     name: 'offer4',
//     type: 'type4',
//     description: 'description4',
//     limit: 4,
//     price: 8.99,
//     photo: 'photo4',
//     card_id: 4,
//     status: 'active',
//   },
//   {
//     name: 'offer5',
//     type: 'type5',
//     description: 'description5',
//     limit: 5,
//     price: 9.99,
//     photo: 'photo5',
//     card_id: 5,
//     status: 'active',
//   },
//   {
//     name: 'offer6',
//     type: 'type6',
//     description: 'description6',
//     limit: 6,
//     price: 10.99,
//     photo: 'photo6',
//     card_id: 6,
//     status: 'active',
//   },
//   {
//     name: 'offer7',
//     type: 'type7',
//     description: 'description7',
//     limit: 7,
//     price: 11.99,
//     photo: 'photo7',
//     card_id: 7,
//     status: 'active',
//   },
//   {
//     name: 'offer8',
//     type: 'type8',
//     description: 'description8',
//     limit: 8,
//     price: 12.99,
//     photo: 'photo8',
//     card_id: 8,
//     status: 'active',
//   },
//   {
//     name: 'offer9',
//     type: 'type9',
//     description: 'description9',
//     limit: 9,
//     price: 13.99,
//     photo: 'photo9',
//     card_id: 9,
//     status: 'active',
//   },
//   {
//     name: 'offer10',
//     type: 'type10',
//     description: 'description10',
//     limit: 10,
//     price: 14.99,
//     photo: 'photo10',
//     card_id: 10,
//     status: 'active',
//   },
// ];

export async function addOffer(req: Request, res: Response) {
  // const { user_id } = req.headers;
  const { name, type, description, limit, price, photo, card_id, status } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const intLimit = parseInt(limit);
  const floatPrice = parseFloat(price);

  try {
    const newOffer = await addOfferToDB(name, type, description, intLimit, floatPrice, photo, card_id, status);

    const responseData = {
      message: 'offer added successfully',
      data: {
        newOffer,
      },
    };

    return res.status(201).json(responseData);
  } catch (e) {
    console.error('ERROR:', e);
    return res.status(400).json({ ERROR: e });
  }
}

export async function getActiveOffers(req: Request, res: Response) {
  try {
    const offers = await getActiveOffersFromDB();

    return res.status(200).json(offers || []);
  } catch (e) {
    console.error('ERROR:', e);
    return res.status(400).json({ ERROR: e });
  }
}

export async function getOffersByCardId(req: Request, res: Response) {
  const { card_id } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const offers = await getOffersByCardIdFromDB(card_id);

    const responseData = offers || [];
    return res.status(200).json(responseData);
  } catch (e) {
    console.error('ERROR:', e);
    return res.status(400).json({ ERROR: e });
  }
}

export async function getOfferById(req: Request, res: Response) {
  // const { id } = req.body;
  const { offer_id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const offer = await getOfferByIdFromDB(offer_id);

    const responseData = offer || {};
    return res.status(200).json(responseData);
  } catch (e) {
    console.error('ERROR:', e);
    return res.status(400).json({ ERROR: e });
  }
}

export async function useOffer(req: Request, res: Response) {
  const { offer_id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const offer = await getOfferByIdFromDB(offer_id);

    if (offer) {
      const updatedOffer = await updateToUsedOffer(offer_id);

      const responseData = {
        message: 'offer used successfully',
        data: {
          updatedOffer,
        },
      };

      return res.status(200).json(responseData);
    } else {
      return res.status(404).json({
        message: 'offer with that id do not exist in DB',
      });
    }
  } catch (e) {
    console.error('ERROR:', e);
    return res.status(400).json({ ERROR: e });
  }
}
