import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUser } from '../models/User';
import { config } from 'dotenv';

config();

interface AuthRequest extends Request {
  user?: IUser;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).send({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};
