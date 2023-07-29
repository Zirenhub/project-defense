import { User } from './User';

export interface SignUp {
  firstName: string;
  lastName: string;
  at: string;
  email: string;
  password: string;
}

export interface LogIn {
  email: string;
  password: string;
}

export interface JWTUser extends User {
  iat: number;
  exp: number;
}
