import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState } from './auth.reducer';

export const selectAuth = (state: AppState) => state.auth;

export const selectAuthUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);
export const selectAuthStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.status
);
export const selectAuthError = createSelector(
  selectAuth,
  (state: AuthState) => state.error
);
export const selectAuthValidationErrors = createSelector(
  selectAuth,
  (state: AuthState) => state.validationErrors
);
