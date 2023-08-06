import { ValidationErrors } from '@angular/forms';
import { createReducer, on } from '@ngrx/store';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';
import * as modalActions from './modal.actions';
import { sharedContext } from '../shared/shared.actions';

// export interface ReplyingTo {
//   _id: string;
//   content: string;
//   firstName: string;
//   lastName: string;
//   at: string;
//   affected: string[];
// }

export interface ModalState {
  context: sharedContext;
  replyingToReply: Reply | null;
  replyingToTweet: Tweet | null;
  retweetingModal: Reply | Tweet | null;
  error: string | null;
  validationErrors: ValidationErrors | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ModalState = {
  context: sharedContext.Modal,
  replyingToReply: null,
  replyingToTweet: null,
  retweetingModal: null,
  error: null,
  validationErrors: null,
  status: 'pending',
};

export const modalReducer = createReducer(
  initialState,
  on(modalActions.openReplyingToTweetModal, (state, { tweet, context }) => ({
    ...state,
    replyingToTweet: tweet,
    context,
    status: 'success' as const,
  })),
  on(modalActions.closeReplyingToTweetModal, (state) => ({
    ...state,
    replyingToTweet: null,
    status: 'pending' as const,
  })),
  on(modalActions.openReplyingToReplyModal, (state, { reply, context }) => ({
    ...state,
    replyingToReply: reply,
    context,
    status: 'success' as const,
  })),
  on(modalActions.closeReplyingToReplyModal, (state) => ({
    ...state,
    replyingToReply: null,
    status: 'pending' as const,
  })),
  on(modalActions.openRetweetModal, (state, { content, context }) => ({
    ...state,
    retweetingModal: content,
    context,
    status: 'success' as const,
  })),
  on(modalActions.closeRetweetModal, (state) => ({
    ...state,
    retweetingModal: null,
    status: 'pending' as const,
  }))
);
