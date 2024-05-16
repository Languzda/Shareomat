import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import BadRequestError from '../errors/BadRequestError';
import ServerError from '../errors/ServerError';
import { RequestWithUser } from '../types/RequestWithUser';

export const isAuth = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new BadRequestError({ code: 401, message: 'Not authenticated', logging: false });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {
    throw new ServerError();
  }
  if (!decodedToken) {
    throw new BadRequestError({ code: 401, message: 'Not authenticated', logging: false });
  }

  // @ts-ignore
  req.userId = decodedToken.userId;
  next();
};
