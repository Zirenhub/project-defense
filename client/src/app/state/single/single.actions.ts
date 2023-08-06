import { ValidationErrors } from '@angular/forms';
import { createAction, props } from '@ngrx/store';
import { Reply, ReplyHierarchy, ReplyStrParent } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

export const retweetTweetSuccess = createAction(
  '[Single] Retweet Tweet Success',
  props<{ tweet: Tweet }>()
);

export const retweetTweetFailure = createAction(
  '[Single] Retweet Tweet Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const retweetReplySuccess = createAction(
  '[Single] Retweet Reply Success',
  props<{ tweet: Tweet }>()
);

export const retweetReplyFailure = createAction(
  '[Single] Retweet Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const postReplySuccess = createAction(
  '[Single] Post Reply Success',
  props<{ reply: Reply }>()
);

export const postReplyFailure = createAction(
  '[Single] Post Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const postReplyToReplySuccess = createAction(
  '[Single] Post Reply to Reply Success',
  props<{ reply: ReplyStrParent }>()
);

export const postReplyToReplyFailure = createAction(
  '[Single] Post Reply to Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const singleGetTweet = createAction(
  '[Single] Get Tweet',
  props<{ id: string }>()
);

export const getTweetSuccess = createAction(
  '[Single] Get Tweet Success',
  props<ReplyHierarchy>()
);

export const getTweetFailure = createAction(
  '[Single] Get Tweet Failure',
  props<{ error: string }>()
);

export const likeTweetSuccess = createAction(
  '[Single] Like Tweet Success',
  props<{ _id: string; likeOrDislike: 'like' | 'dislike' }>()
);

export const likeTweetFailure = createAction(
  '[Single] Like Tweet Failure',
  props<{ error: string }>()
);

export const likeReplySuccess = createAction(
  '[Single] Like Reply Success',
  props<{ _id: string; likeOrDislike: 'like' | 'dislike' }>()
);

export const likeReplyFailure = createAction(
  '[Single] Like Reply Failure',
  props<{ error: string }>()
);
