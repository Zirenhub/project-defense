import { createReducer, on } from '@ngrx/store';
import {
  getTimeline,
  getTimelineFailure,
  getTimelineSuccess,
  getTweet,
  getTweetSuccess,
  postTweetSuccess,
} from './tweet.actions';
import { Tweet } from 'src/app/types/Tweet';
import { Reply } from 'src/app/types/Reply';

export interface TweetState {
  tweets: Tweet[];
  replies: Reply[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
  tweetType: 'single' | 'timeline' | 'reply';
}

export const initialState: TweetState = {
  tweets: [],
  replies: [],
  error: null,
  status: 'pending',
  tweetType: 'timeline',
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
  }))
);
