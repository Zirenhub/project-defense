import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { SingleState } from './single.reducer';

export const selectSingle = (state: AppState) => state.single;

export const selectSingleTweet = createSelector(
  selectSingle,
  (state: SingleState) => state.content.tweet
);

export const selectSingleReplies = createSelector(
  selectSingle,
  (state: SingleState) => state.content.replies
);
