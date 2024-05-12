import { getCardByIdFromDB } from '../controllers/dbControllers/card';
import { body } from 'express-validator';
import { checkIfUserExistById } from './user';

export async function checkIfCardExistsById(card_id: string) {
  const card = await getCardByIdFromDB(card_id);

  return !!card;
}

export const addCardRouteValidator = [
  body('card_id', 'card_id is required').not().isEmpty(),
  body('user_id').custom(async (value) => {
    if (!value) {
      throw new Error('User_id is required');
    }

    if (!(await checkIfUserExistById(value))) {
      return Promise.reject('User not found');
    }
    return true;
  }),
];

export const getCardsRouteValidator = [
  body('user_id').custom(async (value) => {
    if (!value) {
      throw new Error('User_id is required');
    }

    if (!(await checkIfUserExistById(value))) {
      return Promise.reject('User not found');
    }
    return true;
  }),
];
