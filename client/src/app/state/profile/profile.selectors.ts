import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProfileState } from './profile.reducer';

export const selectProfile = (state: AppState) => state.profile;

export const selectProfileTweets = createSelector(
  selectProfile,
  (state: ProfileState) => state.tweets
);

export const selectGetProfile = createSelector(
  selectProfile,
  (state: ProfileState) => state.profile
);

export const selectProfileLikes = createSelector(
  selectProfile,
  (state: ProfileState) => state.likes
);
