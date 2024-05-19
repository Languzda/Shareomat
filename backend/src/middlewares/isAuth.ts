import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';

import BadRequestError from '../errors/BadRequestError';
import { RequestWithUser } from '../types/RequestWithUser';

export const isAuth = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new BadRequestError({ code: 401, message: 'Not authenticated', logging: false });
  }
  const token = authHeader.split(' ')[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err: any) {
    throw new BadRequestError({ code: 401, message: 'Token not authenticated', context: { err }, logging: false });
  }
  if (!decodedToken) {
    throw new BadRequestError({ code: 401, message: 'Not authenticated', logging: false });
  }

  // @ts-ignore
  req.userId = decodedToken.userId;
  next();
};
