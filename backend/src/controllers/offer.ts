import { Request, Response } from 'express';
import {
  addOfferToDB,
  getActiveOffersFromDB,
  getOffersByCardIdFromDB,
  getOfferByIdFromDB,
  updateToUsedOffer,
  deleteAllOffersFromDBByDate,
} from './dbControllers/offer';
import { validationResult } from 'express-validator';
import BadRequestError from '../errors/BadRequestError';
import ServerError from '../errors/ServerError';

export async function addOffer(req: Request, res: Response) {
  const { name, type, description, limit, price, photo, card_id, status } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({ code: 400, message: 'Bad request', context: { errors: errors.array() } });
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
  } catch (e: any) {
    throw new ServerError({ code: 500, message: e.message, context: { error: e }, logging: true });
  }
}

export async function addOfferWithPhoto(req: Request, res: Response) {
  const { name, type, description, limit, price, card_id, status } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({ code: 400, message: 'Bad request', context: { errors: errors.array() } });
  }

  if (!req.file) {
    throw new BadRequestError({ code: 400, message: 'No image provided' });
  }

  console.log(req.file);
  const imageUrl = req.file.path.replace('\\', '/').replace('\\', '/');
  console.log(imageUrl);

  const intLimit = parseInt(limit);
  const floatPrice = parseFloat(price);

  try {
    const newOffer = await addOfferToDB(name, type, description, intLimit, floatPrice, imageUrl, card_id, status);

    const responseData = {
      message: 'offer added successfully',
      data: {
        newOffer,
      },
    };

    return res.status(201).json(responseData);
  } catch (e: any) {
    throw new ServerError({ code: 500, message: e.message, context: { error: e }, logging: true });
  }
}

export async function getActiveOffers(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({ code: 400, message: 'Bad request', context: { errors: errors.array() } });
  }

  const search = (req.query.search as string) || '';

  try {
    const offers = await getActiveOffersFromDB(search);

    return res.status(200).json(offers || []);
  } catch (e: any) {
    throw new ServerError({ code: 500, message: e.message, context: { error: e }, logging: true });
  }
}

export async function getOffersByCardId(req: Request, res: Response) {
  const { card_id } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({ code: 400, message: 'Bad request', context: { errors: errors.array() } });
  }

  try {
    const offers = await getOffersByCardIdFromDB(card_id);

    const responseData = offers || [];
    return res.status(200).json(responseData);
  } catch (e: any) {
    throw new ServerError({ code: 500, message: e.message, context: { error: e }, logging: true });
  }
}

export async function getOfferById(req: Request, res: Response) {
  const { offer_id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({ code: 400, message: 'Bad request', context: { errors: errors.array() } });
  }

  try {
    const offer = await getOfferByIdFromDB(offer_id);

    const responseData = offer || {};
    return res.status(200).json(responseData);
  } catch (e: any) {
    throw new ServerError({ code: 500, message: e.message, context: { error: e }, logging: true });
  }
}

export async function useOffer(req: Request, res: Response) {
  const { offer_id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({ code: 400, message: 'Bad request', context: { errors: errors.array() } });
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
      // throw new BadRequestError({ code: 400, message: 'Bad request', context: { errors: errors.array() } });
      return res.status(404).json({
        message: 'offer with that id do not exist in DB',
      });
    }
  } catch (e: any) {
    throw new ServerError({ code: 500, message: e.message, context: { error: e }, logging: true });
  }
}

export async function deleteAllOfferOlderThen(req: Request, res: Response) {
  const { date } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({ code: 400, message: 'Bad request', context: { errors: errors.array() } });
  }

  const dateObj = new Date(date);

  try {
    const deletedOffers = await deleteAllOffersFromDBByDate(dateObj);

    const responseData = {
      message: 'offers deleted successfully',
      data: {
        deletedOffers,
      },
    };

    return res.status(200).json(responseData);
  } catch (e: any) {
    throw new ServerError({ code: 500, message: e.message, context: { error: e }, logging: true });
  }
}
