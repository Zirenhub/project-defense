import { createAction, props } from '@ngrx/store';
import { ValidationErrors } from 'src/app/types/Api';
import { SignUp } from 'src/app/types/Auth';
import { User } from 'src/app/types/User';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: string }>()
);

export const signup = createAction('[Auth] Signup', props<SignUp>());

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: User }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const checkAuth = createAction('[Auth] Check Auth');

export const checkAuthSuccess = createAction(
  '[Auth] Check Auth Success',
  props<{ user: User }>()
);

export const checkAuthFailure = createAction('[Auth] Check Auth Failure');

export const clearAuthError = createAction('[Auth] Clear Error');
