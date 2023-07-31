import { createAction, props } from '@ngrx/store';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';
import { User } from 'src/app/types/User';

export const profile = createAction(
  '[Profile] Profile',
  props<{ id: string }>()
);
export const profileSuccess = createAction(
  '[Profile] Profile Success',
  props<{ profile: User }>()
);
export const profileFailure = createAction(
  '[Profile] Profile Failure',
  props<{ error: string }>()
);

export const profileLikes = createAction(
  '[Profile] Profile Likes',
  props<{ id: string }>()
);
export const profileLikesSuccess = createAction(
  '[Profile] Profile Likes Success',
  props<{ likes: (Tweet | Reply)[] }>()
);
export const profileLikesFailure = createAction(
  '[Profile] Profile Failure Failure',
  props<{ error: string }>()
);

export const profileTweets = createAction(
  '[Profile] Profile Tweets',
  props<{ id: string }>()
);
export const profileTweetsSuccess = createAction(
  '[Profile] Profile Tweets Success',
  props<{ tweets: Tweet[] }>()
);
export const profileTweetsFailure = createAction(
  '[Profile] Profile Tweets Failure',
  props<{ error: string }>()
);
