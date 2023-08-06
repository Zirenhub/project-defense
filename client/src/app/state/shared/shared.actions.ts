import { createAction, props } from '@ngrx/store';

export enum sharedContext {
  Single = 'single',
  Reply = 'reply',
  Timeline = 'timeline',
  Profile = 'profile',
  Modal = 'modal',
}

export type contextSingle = sharedContext.Single;
export type contextReply = sharedContext.Reply;
export type contextTimeline = sharedContext.Timeline;
export type contextProfile = sharedContext.Profile;
export type contextModal = sharedContext.Modal;

export const postTweet = createAction(
  '[Shared] Post Tweet',
  props<{ content: string; context: sharedContext }>()
);

export const retweetTweet = createAction(
  '[Shared] Retweet Tweet',
  props<{ id: string; content: string; context: sharedContext }>()
);

export const retweetReply = createAction(
  '[Shared] Retweet Reply',
  props<{ id: string; content: string; context: sharedContext }>()
);

export const postReply = createAction(
  '[Shared] Post Reply',
  props<{ id: string; content: string; context: sharedContext }>()
);

export const postReplyToReply = createAction(
  '[Shared] Post Reply to Reply',
  props<{ id: string; content: string; context: sharedContext }>()
);

export const likeTweet = createAction(
  '[Shared] Like Tweet',
  props<{ id: string; context: sharedContext }>()
);

export const likeReply = createAction(
  '[Shared] Like Reply',
  props<{ id: string; context: sharedContext }>()
);

export const clearErros = createAction('[Shared] Clear Errors');
