import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IReply, Single, Timeline, TweetState } from './tweet.reducer';

// selectTweets method to select just part of main app state
export const selectTweets = (state: AppState) => state.tweets;

// Selector to get the content
export const selectContent = createSelector(
  selectTweets,
  (state: TweetState) => state.content
);

// Selector to get the tweetType
export const selectTweetType = createSelector(
  selectTweets,
  (state: TweetState) => state.tweetType
);

export const selectTweetTimline = createSelector(
  selectContent,
  selectTweetType,
  (content, tweetType) => {
    if (tweetType === 'timeline') {
      return content as Timeline;
    }
    return null;
  }
);

export const selectTweetSingle = createSelector(
  selectContent,
  selectTweetType,
  (content, tweetType) => {
    if (tweetType === 'single') {
      return content as Single;
    }
    return null;
  }
);

export const selectTweetReply = createSelector(
  selectContent,
  selectTweetType,
  (content, tweetType) => {
    if (tweetType === 'reply') {
      return content as IReply;
    }
    return null;
  }
);

export const selectTweetsStatus = createSelector(
  selectTweets,
  (state: TweetState) => state.status
);

export const selectTweetError = createSelector(
  selectTweets,
  (state: TweetState) => state.error
);

export const selectTweetValidationErrors = createSelector(
  selectTweets,
  (state: TweetState) => state.validationErrors
);

export const selectReplyingTo = createSelector(
  selectTweets,
  (state: TweetState) => state.replyingTo
);
