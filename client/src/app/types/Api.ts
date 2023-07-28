import { User } from './User';

export type ApiErrors = { msg: string }[] | null;

export interface Api {
  status: 'success' | 'error';
  data?: any;
  errors?: ApiErrors;
  message: string | null;
}

export interface SignUpRes extends Api {
  data: User;
}
