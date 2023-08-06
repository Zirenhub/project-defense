import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ModalState } from './modal.reducer';

export const selectModal = (state: AppState) => state.modal;

export const selectModalReplyingToReply = createSelector(
  selectModal,
  (state: ModalState) => state.replyingToReply
);

export const selectModalReplyingToTweet = createSelector(
  selectModal,
  (state: ModalState) => state.replyingToTweet
);

export const selectModalRetweet = createSelector(
  selectModal,
  (state: ModalState) => state.retweetingModal
);

export const selectModalContext = createSelector(
  selectModal,
  (state: ModalState) => state.context
);
