import { createAction, props } from '@ngrx/store';
import { ReplyHierarchy } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

// create action suplied with a name and some data to send along with it (optionally)
export const postTweet = createAction(
  '[Tweet] Post Tweet',
  props<{ content: string }>()
);

export const postTweetSuccess = createAction(
  '[Tweet] Post Tweet Success',
  props<{ tweet: Tweet }>()
);

export const getTimeline = createAction('[Tweet] Get Timeline');

export const getTimelineSuccess = createAction(
  '[Tweet] Get Timeline Success',
  props<{ timeline: Tweet[] }>()
);

export const getTimelineFailure = createAction(
  '[Tweet] Get Timeline Failure',
  props<{ error: string }>()
);

export const getTweet = createAction(
  '[Tweet] Get Tweet',
  props<{ id: string }>()
);

export const getTweetSuccess = createAction(
  '[Tweet] Get Tweet Success',
  props<ReplyHierarchy>()
);

export const getTweetFailure = createAction(
  '[Tweet] Get Timeline Failure',
  props<{ error: string }>()
);
