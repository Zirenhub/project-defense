import { ValidationErrors } from '@angular/forms';
import { createReducer, on } from '@ngrx/store';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';
import * as singleActions from './single.actions';
import { mapToggleLike, toggleLike } from '../shared/toggleLike';
import { mapToggleRetweet, toggleRetweet } from '../shared/toggleRetweet';
import { mapIncRepliesCount } from '../shared/toggleReply';

export interface Single {
  tweet: Tweet | null;
  replies: Reply[] | null;
}

export interface SingleState {
  content: Single;
  error: string | null;
  validationErrors: ValidationErrors | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: SingleState = {
  content: { tweet: null, replies: null },
  error: null,
  validationErrors: null,
  status: 'pending',
};

export const singleReducer = createReducer(
  initialState,
  on(singleActions.singleGetTweet, (state) => ({
    ...state,
    content: { tweet: null, replies: null },
    error: null,
    validationErrors: null,
    status: 'loading' as const,
  })),
  on(singleActions.getTweetSuccess, (state, { tweet, replies }) => ({
    ...state,
    content: { tweet, replies },
  })),
  on(singleActions.getTweetFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  })),
  on(singleActions.likeTweetSuccess, (state, { _id, likeOrDislike }) => ({
    ...state,
    content: {
      ...state.content,
      tweet:
        state.content.tweet?._id === _id
          ? (toggleLike(state.content.tweet, likeOrDislike) as Tweet)
          : null,
    },
    status: 'success' as const,
  })),
  on(singleActions.likeTweetFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  })),
  on(singleActions.likeReplySuccess, (state, { _id, likeOrDislike }) => ({
    ...state,
    content: {
      ...state.content,
      replies: state.content.replies
        ? (mapToggleLike(_id, likeOrDislike, state.content.replies) as Reply[])
        : null,
    },
    status: 'success' as const,
  })),
  on(singleActions.likeReplyFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  })),
  on(singleActions.retweetTweetSuccess, (state, { tweet }) => ({
    ...state,
    content: {
      ...state.content,
      tweet:
        state.content.tweet &&
        state.content.tweet?._id === tweet.retweet.original?._id
          ? (toggleRetweet(state.content.tweet) as Tweet)
          : null,
    },
    status: 'success' as const,
  })),
  on(
    singleActions.retweetTweetFailure,
    (state, { error, validationErrors }) => ({
      ...state,
      error: error ? error : null,
      validationErrors: validationErrors ? validationErrors : null,
      status: 'error' as const,
    })
  ),
  on(singleActions.retweetReplySuccess, (state, { tweet }) => ({
    ...state,
    content: {
      ...state.content,
      replies: state.content.replies
        ? (mapToggleRetweet(state.content.replies, tweet) as Reply[])
        : null,
    },
    status: 'success' as const,
  })),
  on(
    singleActions.retweetReplyFailure,
    (state, { error, validationErrors }) => ({
      ...state,
      error: error ? error : null,
      validationErrors: validationErrors ? validationErrors : null,
      status: 'error' as const,
    })
  ),
  on(singleActions.postReplySuccess, (state, { reply }) => ({
    ...state,
    content: {
      ...state.content,
      tweet: state.content.tweet
        ? {
            ...state.content.tweet,
            repliesCount: state.content.tweet.repliesCount + 1,
          }
        : state.content.tweet,
      replies: state.content.replies
        ? [reply, ...state.content.replies]
        : [reply],
    },
    status: 'success' as const,
  })),
  on(singleActions.postReplyFailure, (state, { error, validationErrors }) => ({
    ...state,
    error: error ? error : null,
    validationErrors: validationErrors ? validationErrors : null,
    status: 'error' as const,
  })),
  on(singleActions.postReplyToReplySuccess, (state, { reply }) => ({
    ...state,
    content: {
      ...state.content,
      replies: state.content.replies
        ? (mapIncRepliesCount(
            state.content.replies,
            reply.parent
          ) as Reply[])
        : state.content.replies,
    },
    status: 'success' as const,
  })),
  on(
    singleActions.postReplyToReplyFailure,
    (state, { error, validationErrors }) => ({
      ...state,
      error: error ? error : null,
      validationErrors: validationErrors ? validationErrors : null,
      status: 'error' as const,
    })
  )
);
