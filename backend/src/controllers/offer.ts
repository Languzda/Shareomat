import { Request, Response } from 'express';
import {
  addOfferToDB,
  getActiveOffersFromDB,
  getOffersByCardIdFromDB,
  getOfferByIdFromDB,
} from './dbControllers/offer';
import { validationResult } from 'express-validator';

export async function addOffer(req: Request, res: Response) {
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
