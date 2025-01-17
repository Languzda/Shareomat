import { addUserToDB, getUserFromDB } from './dbControllers/user';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/BadRequestError';
import ServerError from '../errors/ServerError';

export async function addUser(req: Request, res: Response) {
  const { login, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({
      code: 422,
      message: 'Validation failed',
      context: { errors: errors.array() },
    });
  }

  try {
    const newClient = await addUserToDB(login, password);

    const responseDate = {
      message: 'User added successfully',
      data: {
        newClient: newClient,
      },
    };

    return res.status(201).json(responseDate);
  } catch (e: any) {
    throw new ServerError({ code: 500, message: e.message, context: { error: e }, logging: true });
  }
}

export async function logInUser(req: Request, res: Response) {
  const { login, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError({
      code: 422,
      message: 'Login validation failed',
      context: { errors: errors.array() },
    });
  }

  try {
    const user = await getUserFromDB(login, password);

    if (user) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '14d' });

      return res.status(200).json({
        message: 'User log in successfully',
        data: {
          userId: user.id,
          token: token,
        },
      });
    } else {
      // throw new BadRequestError({ message: 'User with that login and password does not exist in DB', code: 404});
      return res.status(404).json({
        message: 'User with that login and password does not exist in DB',
      });
    }
  } catch (e: any) {
    throw new ServerError({ message: e.message, context: { error: e } });
  }
}
