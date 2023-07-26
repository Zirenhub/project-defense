import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface IUserRequest extends Request {
  // fix later
  user?: any;
}

const jwtAuth = (req: IUserRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie('token');
    res.status(401).json({
      status: 'error',
      errors: null,
      message: err instanceof Error ? err.message : 'unknown',
    });
  }
};

export { jwtAuth, IUserRequest };
