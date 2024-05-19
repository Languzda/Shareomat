import { Request } from 'express';
import jwt from 'jsonwebtoken';

export interface RequestWithUser extends Request {
  userId?: jwt.JwtPayload['userId'];
}
