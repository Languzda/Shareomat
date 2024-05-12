import { body, header, param } from 'express-validator';
import { checkIfUserExistById } from './user';
import { checkIfCardExistsById } from './card';

export const addOfferRouteValidator = [
  body('name', 'Name must be not empty').not().isEmpty(),
  body('description', 'Description must be not empty').not().isEmpty(),
  body('limit', 'Limit must be not empty').not().isEmpty().isInt(),
  body('price', 'Price must be not empty').not().isEmpty().isDecimal(),
  // body('photo', 'Photo must be not empty').not().isEmpty(),
  body('card_id', 'Card_id must be not empty').not().isEmpty(),
  body('status', 'Status must be not empty').not().isEmpty(),
  body('type', 'Type must be not empty').not().isEmpty(),
  header('user_id').custom(async (value) => {
    if (!value) {
      throw new Error('User_id is required');
    }

    if (!(await checkIfUserExistById(value))) {
      return Promise.reject('User not found');
    }
    return true;
  }),
];

export const getOfferByCardIdRouteValidator = [
  body('card_id').custom(async (value) => {
    if (!value) {
      throw new Error('Card_id is required');
    }

    if (!(await checkIfCardExistsById(value))) {
      return Promise.reject('Card not found');
    }
  }),
];

export const getOfferByIdRouteValidator = [param('offer_id', 'Validate offer_id param').not().isEmpty()];