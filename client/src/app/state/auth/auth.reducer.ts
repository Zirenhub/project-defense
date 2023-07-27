import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/types/User';
import { loginSuccess, logoutSuccess, signupSuccess } from './auth.actions';

export interface AuthState {
  user: User | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: AuthState = {
  user: null,
  error: null,
  status: 'pending',
};

export const authReducer = createReducer(
  initialState,
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
  }))
);
