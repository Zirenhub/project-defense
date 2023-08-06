import { ValidationErrors } from '@angular/forms';
import { createAction, props } from '@ngrx/store';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

export const postTweetSuccess = createAction(
  '[Timeline] Post Tweet Success',
  props<{ tweet: Tweet }>()
);

export const postTweetFailure = createAction(
  '[Timeline] Post Tweet Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const postReplySuccess = createAction(
  '[Timeline] Post Reply Success',
  props<{ reply: Reply }>()
);

export const postReplyFailure = createAction(
  '[Timeline] Post Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const retweetTweetSuccess = createAction(
  '[Timeline] Retweet Tweet Success',
  props<{ tweet: Tweet }>()
);

export const retweetTweetFailure = createAction(
  '[Timeline] Retweet Tweet Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const likeTweetSuccess = createAction(
  '[Timeline] Like Tweet Success',
  props<{ _id: string; likeOrDislike: 'like' | 'dislike' }>()
);

export const likeTweetFailure = createAction(
  '[Timeline] Like Tweet Failure',
  props<{ error: string }>()
);

export const getTimeline = createAction('[Timeline] Get Timeline');

export const getTimelineSuccess = createAction(
  '[Timeline] Get Timeline Success',
  props<{ timeline: Tweet[] }>()
);

export const getTimelineFailure = createAction(
  '[Timeline] Get Timeline Failure',
  props<{ error: string }>()
);
