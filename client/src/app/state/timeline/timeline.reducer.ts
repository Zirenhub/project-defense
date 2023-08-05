import { ValidationErrors } from '@angular/forms';
import { createReducer, on } from '@ngrx/store';
import { Tweet } from 'src/app/types/Tweet';
import * as timelineActions from './timeline.actions';
import { mapToggleLike, toggleLike } from '../shared/toggleLike';
import { mapToggleRetweet } from '../shared/toggleRetweet';

export interface Timeline {
  tweets: Tweet[] | null;
}

export interface TimelineState {
  content: Timeline;
  error: string | null;
  validationErrors: ValidationErrors | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TimelineState = {
  content: { tweets: null },
  error: null,
  validationErrors: null,
  status: 'pending',
};

export const timelineReducer = createReducer(
  initialState,
  on(timelineActions.getTimeline, (state) => ({
    ...state,
    content: { tweets: null },
    error: null,
    validationErrors: null,
    status: 'loading' as const,
  })),
  on(timelineActions.getTimelineSuccess, (state, { timeline }) => ({
    ...state,
    content: { tweets: timeline },
    status: 'success' as const,
  })),
  on(timelineActions.getTimelineFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  })),
  on(timelineActions.likeTweetSuccess, (state, { _id, likeOrDislike }) => ({
    ...state,
    content: {
      tweets: state.content.tweets
        ? (mapToggleLike(_id, likeOrDislike, state.content.tweets) as Tweet[])
        : null,
    },
    status: 'success' as const,
  })),
  on(timelineActions.likeTweetFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  })),
  on(timelineActions.postTweetSuccess, (state, { tweet }) => ({
    ...state,
    content: {
      tweets: state.content.tweets ? [tweet, ...state.content.tweets] : [tweet],
    },
    status: 'success' as const,
  })),
  on(
    timelineActions.postTweetFailure,
    (state, { error, validationErrors }) => ({
      ...state,
      error: error ? error : null,
      validationErrors: validationErrors ? validationErrors : null,
      status: 'error' as const,
    })
  ),
  on(timelineActions.retweetTweetSuccess, (state, { tweet }) => ({
    ...state,
    content: {
      tweets: state.content.tweets
        ? ([tweet, mapToggleRetweet(state.content.tweets, tweet)] as Tweet[])
        : [tweet],
    },
    status: 'success' as const,
  })),
  on(
    timelineActions.retweetTweetFailure,
    (state, { error, validationErrors }) => ({
      ...state,
      error: error ? error : null,
      validationErrors: validationErrors ? validationErrors : null,
      status: 'error' as const,
    })
  )
);
