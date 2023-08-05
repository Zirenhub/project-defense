import { createAction, props } from '@ngrx/store';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

export const openReplyingToTweetModal = createAction(
  '[Modal] Open Replying to Tweet Modal',
  props<{ tweet: Tweet }>()
);

export const closeReplyingToTweetModal = createAction(
  '[Modal] Close Replying to Tweet Modal'
);

export const openReplyingToReplyModal = createAction(
  '[Modal] Open Replying to Reply Modal',
  props<{ reply: Reply }>()
);

export const closeReplyingToReplyModal = createAction(
  '[Modal] Close Replying to Reply Modal'
);

export const openRetweetModal = createAction(
  '[Modal] Open Retweet Modal',
  props<{ content: Reply | Tweet }>()
);

export const closeRetweetModal = createAction('[Modal] Close Retweet Modal');
