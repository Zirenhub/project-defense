import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CredentialsModel from '../models/credentials';
import ProfileModel from '../models/profile';
import mongoose from 'mongoose';

const currentYear = new Date().getFullYear();

export const login = [
  body('email', 'Invalid Email')
    .trim()
    .isEmail()
    .withMessage('Wrong email format.')
    .normalizeEmail()
    .isLength({ max: 18 })
    .withMessage('Email is too long'),
  body('password', 'Invalid password')
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be at least 8 and at most 16 characters.'),
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
      return res.status(500).json({
        status: 'error',
        errors: null,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }
  },
];

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  return res.json({ status: 'success', data: null, message: null });
};

export const signup = [
  body('firstName', 'Invalid first name').trim().isLength({ min: 3, max: 12 }),
  body('lastName', 'Invalid last name').trim().isLength({ min: 3, max: 12 }),
  body('at', 'Invalid @')
    .trim()
    .isLength({ min: 3, max: 12 })
    .custom(async (value) => {
      return ProfileModel.exists({ at: value }).then((user) => {
        if (user) {
          return Promise.reject('"@" already in use');
        }
      });
    }),
  body('email', 'Invalid Email')
    .trim()
    .isEmail()
    .withMessage('Wrong email format.')
    .normalizeEmail()
    .isLength({ max: 18 })
    .withMessage('Email is too long')
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
  // body('birthday')
  //   .notEmpty()
  //   .isISO8601()
  //   .toDate()
  //   .withMessage('Invalid date.')
  //   .custom((value: Date) => {
  //     const day = value.getDate();
  //     const month = value.getMonth();
  //     const year = value.getFullYear();

  //     if (day < 1 || day > 31) {
  //       return Promise.reject('Birthday day is not valid.');
  //     }
  //     if (month < 0 || month > 11) {
  //       return Promise.reject('Birthday month is not valid.');
  //     }
  //     if (year < 1900 || year > currentYear) {
  //       return Promise.reject('Birthday year is not valid.');
  //     }
  //     return true;
  //   }),

  // add profile pic and bio

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
      const { firstName, lastName, email, password, at } = req.body;
      // const birthday: Date = req.body.birthday;
      const birthday = new Date();

      const newProfile = new ProfileModel({
        firstName,
        lastName,
        birthday,
        at,
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

      return res.status(201).json({
        status: 'success',
        data: newProfile.toObject(),
        message: null,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        errors: null,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }
  },
];

export const me = async (req: Request, res: Response) => {
  return res.json({ status: 'success', data: res.locals.user, message: null });
};
