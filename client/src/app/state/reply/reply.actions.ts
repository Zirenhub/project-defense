import { ValidationErrors } from '@angular/forms';
import { createAction, props } from '@ngrx/store';
import { FullReply, Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

export const retweetTweetSuccess = createAction(
  '[Reply] Retweet Tweet Success',
  props<{ tweet: Tweet }>()
);

export const retweetTweetFailure = createAction(
  '[Reply] Retweet Tweet Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const retweetReplySuccess = createAction(
  '[Reply] Retweet Reply Success',
  props<{ tweet: Tweet }>()
);

export const retweetReplyFailure = createAction(
  '[Reply] Retweet Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const getReply = createAction(
  '[Tweet] Get Reply',
  props<{ id: string }>()
);

export const getReplySuccess = createAction(
  '[Tweet] Get Reply Success',
  props<FullReply>()
);

export const getReplyFailure = createAction(
  '[Tweet] Get Reply Failure',
  props<{ error: string }>()
);

export const postReplySuccess = createAction(
  '[Reply] Post Reply Success',
  props<{ reply: Reply }>()
);

export const postReplyFailure = createAction(
  '[Reply] Post Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const postReplyToReplySuccess = createAction(
  '[Reply] Post Reply to Reply Success',
  props<{ reply: Reply }>()
);

export const postReplyToReplyFailure = createAction(
  '[Reply] Post Reply to Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const likeTweetSuccess = createAction(
  '[Reply] Like Tweet Success',
  props<{ _id: string; likeOrDislike: 'like' | 'dislike' }>()
);

export const likeTweetFailure = createAction(
  '[Reply] Like Tweet Failure',
  props<{ error: string }>()
);

export const likeReplySuccess = createAction(
  '[Reply] Like Reply Success',
  props<{ _id: string; likeOrDislike: 'like' | 'dislike' }>()
);

export const likeReplyFailure = createAction(
  '[Reply] Like Reply Failure',
  props<{ error: string }>()
);
