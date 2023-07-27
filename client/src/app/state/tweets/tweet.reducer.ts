import { createReducer, on } from '@ngrx/store';
import { postTweet } from './tweet.actions';

export interface TweetState {
  tweets: any[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TweetState = {
  tweets: [],
  error: null,
  status: 'pending',
};

export const tweetReducer = createReducer(
  initialState,
  on(postTweet, (state, { content }) => ({
    ...state,
    tweets: [...state.tweets, { content }],
  }))
);
