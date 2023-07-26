import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  at: 'string';
  bio: string | null;
  birthday: 'string';
  profilePic: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  iat: number;
  exp: number;
}

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    jwt.verify(token, process.env.JWT_SECRET as string, {}, (err, decoded) => {
      if (err) {
        throw new Error(`JWT verification failed: ${err.message}`);
      } else {
        res.locals.user = decoded as User;
        next();
      }
    });
  } catch (err) {
    res.clearCookie('token');
    return res.status(401).json({
      status: 'error',
      errors: null,
      message: err instanceof Error ? err.message : 'unknown',
    });
  }
};

export { jwtAuth, User };
