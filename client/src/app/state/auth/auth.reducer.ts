import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/types/User';
import {
  checkAuthFailure,
  checkAuthSuccess,
  clearAuthError,
  loginFailure,
  loginSuccess,
  logoutSuccess,
  signupFailure,
  signupSuccess,
} from './auth.actions';
import { ValidationErrors } from 'src/app/types/Api';

export type AuthStateStatus =
  | 'pending'
  | 'loading'
  | 'error'
  | 'validationErrors'
  | 'success';

export interface AuthState {
  user: User | null;
  error: string | null;
  validationErrors: ValidationErrors | null;
  status: AuthStateStatus;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  validationErrors: null,
  status: 'pending',
};

const assignFailure = (
  state: AuthState,
  {
    error,
    validationErrors,
  }: {
    error: string | undefined;
    validationErrors: ValidationErrors | undefined;
  }
) => {
  let modified = {
    ...state,
  };
  if (error) {
    modified = Object.assign(modified, {
      error,
      status: 'error',
    });
  } else if (validationErrors) {
    modified = Object.assign(modified, {
      validationErrors,
      status: 'validationErrors',
    });
  }
  return modified;
};

export const authReducer = createReducer(
  initialState,
  on(checkAuthSuccess, (state, { user }) => ({
    ...state,
    user,
    status: 'success' as const,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    status: 'success' as const,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    user: null,
    status: 'success' as const,
  })),
  on(signupSuccess, (state, { user }) => ({
    ...state,
    user,
    status: 'success' as const,
  })),
  on(signupFailure, (state, { error, validationErrors }) => {
    return assignFailure(state, { error, validationErrors });
  }),
  on(loginFailure, (state, { error, validationErrors }) => {
    return assignFailure(state, { error, validationErrors });
  }),
  on(checkAuthFailure, (state) => ({
    ...state,
    error: 'Unauthorized',
    status: 'error' as const,
  })),
  on(clearAuthError, (state) => ({
    ...state,
    error: null,
    validationErrors: null,
    status: 'pending' as const,
  }))
);
