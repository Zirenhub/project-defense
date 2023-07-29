import { JWTUser } from './Auth';
import { User } from './User';

export type ValidationErrors = { msg: string }[];

export interface Api {
  status: 'success' | 'error';
  data?: any;
  errors?: ValidationErrors | null;
  message: string | null;
}

export interface SignUpRes extends Api {
  data: User;
}

export interface CheckAuthRes extends Api {
  data: JWTUser;
}
