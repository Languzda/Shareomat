import { addCardToDB, getUserCardsFromDB } from './dbControllers/card';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestWithUser } from '../types/RequestWithUser';
import BadRequestError from '../errors/BadRequestError';
import ServerError from '../errors/ServerError';

export async function addCard(req: RequestWithUser, res: Response) {
  const user_id = req.userId;
  const { card_id } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({ code: 400, message: 'Bad request', context: { errors: errors.array() } });
  }

  try {
    const newCard = await addCardToDB(card_id, user_id);

    const responseDate = {
      message: 'card adding status',
      data: {
        newCard,
      },
    };

    res.status(201).json(responseDate);
  } catch (e: any) {
    throw new ServerError({ code: 500, message: e.message, context: { error: e }, logging: true });
  }
}

export async function getUserCards(req: Request, res: Response) {
  const { user_id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({ code: 400, message: 'Bad request', context: { errors: errors.array() } });
  }

  try {
    const cards = await getUserCardsFromDB(user_id);

    const responseDate = {
      message: 'User cards',
      data: {
        cards,
      },
    };

    res.status(200).json(responseDate);
  } catch (e: any) {
    throw new ServerError({ code: 500, message: e.message, context: { error: e }, logging: true });
  }
}
