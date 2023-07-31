import { createAction, props } from '@ngrx/store';
import { ValidationErrors } from 'src/app/types/Api';
import { FullReply, Reply, ReplyHierarchy } from 'src/app/types/Reply';
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

export const postTweetFailure = createAction(
  '[Tweet] Post Tweet Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const retweetTweet = createAction(
  '[Tweet] Retweet Tweet',
  props<{ id: string; content: string }>()
);

export const retweetTweetSuccess = createAction(
  '[Tweet] Retweet Tweet Success',
  props<{ tweet: Tweet }>()
);

export const retweetTweetFailure = createAction(
  '[Tweet] Retweet Tweet Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const retweetReply = createAction(
  '[Tweet] Retweet Reply',
  props<{ id: string; content: string }>()
);

export const retweetReplySuccess = createAction(
  '[Tweet] Retweet Reply Success',
  props<{ tweet: Tweet }>()
);

export const retweetReplyFailure = createAction(
  '[Tweet] Retweet Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const postReply = createAction(
  '[Tweet] Post Reply',
  props<{ id: string; content: string }>()
);

export const postReplySuccess = createAction(
  '[Tweet] Post Reply Success',
  props<{ reply: Reply }>()
);

export const postReplyFailure = createAction(
  '[Tweet] Post Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const postReplyToReply = createAction(
  '[Tweet] Post Reply to Reply',
  props<{ id: string; content: string }>()
);

export const postReplyToReplySuccess = createAction(
  '[Tweet] Post Reply to Reply Success',
  props<{ reply: Reply }>()
);

export const postReplyToReplyFailure = createAction(
  '[Tweet] Post Reply to Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
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

export const likeTweet = createAction(
  '[Tweet] Like Tweet',
  props<{ id: string; isOnProfile: boolean }>()
);

export const likeTweetSuccess = createAction(
  '[Tweet] Like Tweet Success',
  props<{ _id: string; likeOrDislike: 'like' | 'dislike' }>()
);

export const likeTweetFailure = createAction(
  '[Tweet] Like Tweet Failure',
  props<{ error: string }>()
);

export const likeReply = createAction(
  '[Tweet] Like Reply',
  props<{ id: string; isOnProfile: boolean }>()
);

export const likeReplySuccess = createAction(
  '[Tweet] Like Reply Success',
  props<{ _id: string; likeOrDislike: 'like' | 'dislike' }>()
);

export const likeReplyFailure = createAction(
  '[Tweet] Like Reply Failure',
  props<{ error: string }>()
);

export const openTweetModal = createAction('[Tweet] Open Tweet Modal');

export const closeTweetModal = createAction('[Tweet] Close Tweet Modal');

export const openReplyModal = createAction(
  '[Tweet] Open Reply Modal',
  props<{ id: string; context: 'tweet' | 'reply' }>()
);

export const closeReplyingToModal = createAction('[Tweet] Close Reply Modal');

export const openRetweetModal = createAction(
  '[Tweet] Open Retweet Modal',
  props<{ id: string; context: 'tweet' | 'reply' }>()
);

export const closeRetweetModal = createAction('[Tweet] Close Retweet Modal');

export const clearTweetError = createAction('[Tweet] Clear Tweet Error');
