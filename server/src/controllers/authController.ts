import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CredentialsModel from '../models/credentials';
import ProfileModel from '../models/profile';
import { IUserRequest } from '../middleware/jwtAuth';
import mongoose from 'mongoose';

const currentYear = new Date().getFullYear();

export const login = [
  body('email')
    .normalizeEmail()
    .trim()
    .escape()
    .isEmail()
    .withMessage('Email is invalid.'),
  body('password').trim(),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
          message: null,
        });
      }

      const { email, password } = req.body;
      const user = await CredentialsModel.findOne({ email });

      if (!user) {
        return res.status(403).json({
          status: 'error',
          errors: null,
          message: 'User not found.',
        });
      }

      const passwordIsMatch = await bcrypt.compare(password, user.password);

      if (passwordIsMatch) {
        const profile = await ProfileModel.findById(user.profile);
        // something very srys is wrong if this is true
        if (!profile) {
          return res.status(403).json({
            status: 'error',
            errors: null,
            message: 'Profile not found.',
          });
        }
        const token = jwt.sign(
          profile.toObject(),
          process.env.JWT_SECRET as string,
          {
            expiresIn: '1h',
          }
        );
        res.cookie('token', token, {
          httpOnly: true,
        });

        return res.json({
          status: 'success',
          data: profile.toObject(),
          message: null,
        });
      }
      return res.status(403).json({
        status: 'error',
        errors: null,
        message: 'Wrong password.',
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        errors: null,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }
  },
];

export const logout = (req: IUserRequest, res: Response) => {
  res.clearCookie('token');
  return res.json({ status: 'success', data: null, message: null });
};

export const signup = [
  body('firstName').trim().notEmpty().isLength({ min: 3, max: 12 }),
  body('lastName').trim().notEmpty().isLength({ min: 3, max: 12 }),
  body('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Wrong email format.')
    .normalizeEmail()
    .isLength({ min: 2, max: 18 })
    .custom(async (value) => {
      return CredentialsModel.exists({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  body('password')
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be at least 8 and at most 16 characters.'),
  body('birthday')
    .notEmpty()
    .isISO8601()
    .toDate()
    .withMessage('Invalid date.')
    .custom((value: Date) => {
      const day = value.getDate();
      const month = value.getMonth();
      const year = value.getFullYear();

      if (day < 1 || day > 31) {
        return Promise.reject('Birthday day is not valid.');
      }
      if (month < 0 || month > 11) {
        return Promise.reject('Birthday month is not valid.');
      }
      if (year < 1900 || year > currentYear) {
        return Promise.reject('Birthday year is not valid.');
      }
      return true;
    }),

  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
          message: null,
        });
      }
      const { firstName, lastName, email, password } = req.body;
      const birthday: Date = req.body.birthday;

      const newProfile = new ProfileModel({
        firstName,
        lastName,
        birthday,
      });
      const newUser = new CredentialsModel({
        email,
        password,
        profile: newProfile._id,
      });

      // undo if one fails.
      const session = await mongoose.startSession();
      session.startTransaction();

      await newProfile.save({ session });
      await newUser.save({ session });

      await session.commitTransaction();

      res.status(201).json({
        status: 'success',
        data: newProfile.toObject(),
        message: null,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        errors: null,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }
  },
];

export const me = async (req: IUserRequest, res: Response) => {
  res.json({ status: 'success', data: req.user, message: null });
};
