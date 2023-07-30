import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TweetState } from './tweet.reducer';

// selectTweets method to select just part of main app state
export const selectTweets = (state: AppState) => state.tweets;
// selector to return tweets data
export const selectAllTweets = createSelector(
  selectTweets,
  (state: TweetState) => state.tweets
);
export const selectTweetsStatus = createSelector(
  selectTweets,
  (state: TweetState) => state.status
);

export const selectTweet = createSelector(
  selectTweets,
  (state: TweetState) => state.tweets[0]
);

export const selectReplies = createSelector(
  selectTweets,
  (state: TweetState) => state.replies
);
