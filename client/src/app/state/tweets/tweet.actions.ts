import { createAction, props } from '@ngrx/store';

// create action suplied with a name and some data to send along with it (optionally)
export const postTweet = createAction(
  '[Twitter Page] Post Tweet',
  props<{ content: string }>()
);
