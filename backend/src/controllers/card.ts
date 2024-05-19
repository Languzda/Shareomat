import { addCardToDB, getUserCardsFromDB } from './dbControllers/card';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestWithUser } from '../types/RequestWithUser';

export async function addCard(req: RequestWithUser, res: Response) {
  const user_id = req.userId;
  const { card_id } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
  } catch (e) {
    console.error('ERROR:', e);

    res.status(400).json({ ERROR: e });
  }
}

export async function getUserCards(req: Request, res: Response) {
  const { user_id } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
  } catch (e) {
    console.error('ERROR:', e);

    res.status(400).json({ ERROR: e });
  }
}
