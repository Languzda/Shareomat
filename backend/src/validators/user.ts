import { countUserByIdInDB, countUserByLoginInDB } from '../controllers/dbControllers/user';
import { body } from 'express-validator';

export async function checkIfUserExistById(userId: string) {
  return 1 === (await countUserByIdInDB(userId));
}

export async function checkIfUserExistByLogin(userLogin: string) {
  return 1 === (await countUserByLoginInDB(userLogin));
}

export const loginRouteValidator = [
  body('password', 'Password must be not empty').not().isEmpty().isAlphanumeric(),
  body('login')
    .not()
    .isEmpty()
    .withMessage('login is required')
    .custom(async (value) => {
      // if (value === 'login') {
      //   throw new Error('PLS not login');
      // }
      // return true;
      if (!(await checkIfUserExistByLogin(value))) {
        return Promise.reject('User not found');
      }
    }),
];

export const registerRouteValidator = [
  body('password', 'Password must be not empty and have at least 5 characters')
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .isAlphanumeric(),
  body('login')
    .not()
    .isEmpty()
    .withMessage('login is required')
    .isLength({ min: 3 })
    .withMessage('login must have at least 3 characters')
    .custom(async (value) => {
      if (await checkIfUserExistByLogin(value)) {
        return Promise.reject('User already exist');
      }
    }),
];
