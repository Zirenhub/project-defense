import { createReducer, on } from '@ngrx/store';
import {
  clearTweetError,
  getTimeline,
  getTimelineFailure,
  getTimelineSuccess,
  getTweet,
  getTweetSuccess,
  likeReplyFailure,
  likeReplySuccess,
  likeTweetFailure,
  likeTweetSuccess,
  postReplyFailure,
  postReplySuccess,
  postTweetSuccess,
} from './tweet.actions';
import { Tweet } from 'src/app/types/Tweet';
import { Reply } from 'src/app/types/Reply';
import { ValidationErrors } from 'src/app/types/Api';

export interface TweetState {
  tweets: Tweet[];
  replies: Reply[];
  error: string | null;
  validationErrors: ValidationErrors | null;
  status: 'pending' | 'loading' | 'error' | 'success';
  tweetType: 'single' | 'timeline' | 'reply';
}

export const initialState: TweetState = {
  tweets: [],
  replies: [],
  error: null,
  validationErrors: null,
  status: 'pending',
  tweetType: 'timeline',
};

const likeDislike = (
  state: TweetState,
  type: 'tweets' | 'replies',
  _id: string,
  change: 'like' | 'dislike'
) => {
  const stateOfType = state[type];
  const modified = stateOfType.map((x) =>
    x._id === _id
      ? {
          ...x,
          isLiked: change === 'like' ? true : false,
          likesCount: change === 'like' ? x.likesCount + 1 : x.likesCount - 1,
        }
      : x
  );
  const newState: TweetState = {
    ...state,
    [type]: modified,
    status: 'success',
  };
  return newState;
};

export const tweetReducer = createReducer(
  initialState,
  on(postTweetSuccess, (state, { tweet }) => ({
    ...state,
    tweets: [tweet, ...state.tweets],
  })),
  on(getTimeline, (state) => ({
    ...state,
    tweets: [],
    replies: [],
    status: 'loading' as const,
  })),
  on(getTweet, (state) => ({
    ...state,
    tweets: [],
    replies: [],
    status: 'loading' as const,
  })),
  on(getTimelineSuccess, (state, { timeline }) => ({
    ...state,
    tweets: timeline,
    replies: [],
    status: 'success' as const,
    tweetType: 'timeline' as const,
  })),
  on(getTimelineFailure, (state, { error }) => ({
    ...state,
    errror: error,
    status: 'error' as const,
  })),
  on(getTweetSuccess, (state, { tweet, replies }) => ({
    ...state,
    tweets: [tweet],
    replies,
    status: 'success' as const,
    tweetType: 'single' as const,
  })),
  on(likeTweetSuccess, (state, { _id, likeOrDislike }) => {
    return likeDislike(state, 'tweets', _id, likeOrDislike);
  }),
  on(likeReplySuccess, (state, { _id, likeOrDislike }) => {
    return likeDislike(state, 'replies', _id, likeOrDislike);
  }),
  on(likeTweetFailure, (state, { error }) => ({
    ...state,
    errror: error,
    status: 'error' as const,
  })),
  on(likeReplyFailure, (state, { error }) => ({
    ...state,
    errror: error,
    status: 'error' as const,
  })),
  on(postReplySuccess, (state, { reply }) => {
    if (state.tweetType !== 'timeline') {
      return {
        ...state,
        replies: [reply, ...state.replies],
        status: 'success' as const,
      };
    }
    return { ...state, status: 'success' as const };
  }),
  on(postReplyFailure, (state, { error, validationErrors }) => {
    if (validationErrors && validationErrors.length > 0) {
      return {
        ...state,
        errror: null,
        validationErrors,
        status: 'error' as const,
      };
    } else if (error) {
      return {
        ...state,
        error,
        validationErrors: null,
        status: 'error' as const,
      };
    }
    return { ...state };
  }),
  on(clearTweetError, (state) => ({
    ...state,
    errror: null,
    validationErrors: null,
    status: 'pending' as const,
  }))
);
