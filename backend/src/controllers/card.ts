import { addCardToDB, getUserCardsFromDB } from './dbControllers/card';
import { Request, Response } from 'express';

export async function addCard(req: Request, res: Response) {
  const { card_id, user_id } = req.body;

  if (!card_id || !user_id) {
    res.status(400).json({
      message: 'card_id and user_id are required',
    });
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

  if (!user_id) {
    res.status(400).json({
      message: 'user_id is required',
    });
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
