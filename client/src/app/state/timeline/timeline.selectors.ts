import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TimelineState } from './timeline.reducer';

export const selectTimeline = (state: AppState) => state.timeline;

export const selectTimelineTweets = createSelector(
  selectTimeline,
  (state: TimelineState) => state.content.tweets
);

export const selectTimelineTrending = createSelector(
  selectTimeline,
  (state: TimelineState) => state.content.trending
);
