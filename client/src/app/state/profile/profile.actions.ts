import { ValidationErrors } from '../../types/Api';
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

export const likeTweetSuccess = createAction(
  '[Profile] Profile Like Tweet Success',
  props<{ _id: string; likeOrDislike: 'like' | 'dislike' }>()
);
export const likeTweetFailure = createAction(
  '[Profile] Profile Like Tweet Failure',
  props<{ error: string }>()
);

export const retweetTweetSuccess = createAction(
  '[Profile] Retweet Tweet Success',
  props<{ tweet: Tweet }>()
);
export const retweetTweetFailure = createAction(
  '[Profile] Retweet Tweet Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const retweetReplySuccess = createAction(
  '[Profile] Retweet Reply Success',
  props<{ tweet: Tweet }>()
);
export const retweetReplyFailure = createAction(
  '[Profile] Retweet Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const postReplySuccess = createAction(
  '[Profile] Post Reply Success',
  props<{ reply: Reply }>()
);
export const postReplyFailure = createAction(
  '[Profile] Post Reply Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);

export const follow = createAction('[Profile] Follow', props<{ id: string }>());
export const followSucces = createAction(
  '[Profile] Follow Success',
  props<{ profile: User }>()
);
export const followFailure = createAction(
  '[Profile] Follow Failure',
  props<{ error: string }>()
);

export const unfollow = createAction(
  '[Profile] Unfollow',
  props<{ id: string }>()
);
export const unfollowSucces = createAction(
  '[Profile] Unfollow Success',
  props<{ profile: User }>()
);
export const unfollowFailure = createAction(
  '[Profile] Unfollow Failure',
  props<{ error: string }>()
);

export const postTweetSuccess = createAction(
  '[Timeline] Post Tweet Success',
  props<{ tweet: Tweet }>()
);

export const postTweetFailure = createAction(
  '[Timeline] Post Tweet Failure',
  props<{ error?: string; validationErrors?: ValidationErrors }>()
);
