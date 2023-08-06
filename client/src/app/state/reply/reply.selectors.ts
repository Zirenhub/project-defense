import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ReplyState } from './reply.reducer';

export const selectReply = (state: AppState) => state.reply;

export const selectReplyTweet = createSelector(
  selectReply,
  (state: ReplyState) => state.content.tweet
);

export const selectReplyParents = createSelector(
  selectReply,
  (state: ReplyState) => state.content.parents
);

export const selectReplyReply = createSelector(
  selectReply,
  (state: ReplyState) => state.content.reply
);

export const selectReplyChildren = createSelector(
  selectReply,
  (state: ReplyState) => state.content.children
);
