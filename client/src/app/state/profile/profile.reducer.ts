import { createReducer, on } from '@ngrx/store';
import { Tweet } from 'src/app/types/Tweet';
import { Reply } from 'src/app/types/Reply';
import * as profileActions from './profile.actions';
import { User } from 'src/app/types/User';
import { mapToggleLike } from '../shared/toggleLike';
import { ValidationErrors } from 'src/app/types/Api';
import { mapIncRepliesCount } from '../shared/incReplies';
import { mapToggleRetweet } from '../shared/toggleRetweet';

export interface ProfileState {
  profile: User | null;
  tweets: Tweet[];
  replies: Reply[];
  likes: (Tweet | Reply)[];
  error: string | null;
  validationErrors: ValidationErrors | null;
  status: 'pending' | 'loading' | 'error' | 'validationErrors' | 'success';
}

export const initialState: ProfileState = {
  profile: null,
  tweets: [],
  replies: [],
  likes: [],
  error: null,
  validationErrors: null,
  status: 'pending',
};

export const profileReducer = createReducer(
  initialState,
  on(profileActions.profileTweetsSuccess, (state, { tweets }) => ({
    ...state,
    tweets,
    status: 'success' as const,
  })),
  on(profileActions.profileTweetsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(profileActions.profileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    status: 'success' as const,
  })),
  on(profileActions.profileFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(profileActions.profileLikesSuccess, (state, { likes }) => ({
    ...state,
    likes,
    status: 'success' as const,
  })),
  on(profileActions.profileLikesFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(profileActions.likeTweetSuccess, (state, { _id, likeOrDislike }) => ({
    ...state,
    tweets: mapToggleLike(_id, likeOrDislike, state.tweets) as Tweet[],
    likes: mapToggleLike(_id, likeOrDislike, state.likes),
    status: 'success' as const,
  })),
  on(profileActions.likeTweetFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(profileActions.postReplySuccess, (state, { reply }) => ({
    ...state,
    tweets: mapIncRepliesCount(state.tweets, reply.tweet._id) as Tweet[],
    likes: mapIncRepliesCount(state.likes, reply.tweet._id),
    status: 'success' as const,
  })),
  on(profileActions.postReplyFailure, (state, { error, validationErrors }) => ({
    ...state,
    error: error ? error : null,
    validationErrors: validationErrors ? validationErrors : null,
    status: 'error' as const,
  })),
  on(profileActions.retweetTweetSuccess, (state, { tweet }) => ({
    ...state,
    tweets:
      tweet.profile._id === state.profile?._id
        ? [tweet, ...(mapToggleRetweet(state.tweets, tweet) as Tweet[])]
        : (mapToggleRetweet(state.tweets, tweet) as Tweet[]),
    // likes: mapIncRepliesCount(state.likes, reply.tweet._id),
    status: 'success' as const,
  })),
  on(
    profileActions.retweetTweetFailure,
    (state, { error, validationErrors }) => ({
      ...state,
      error: error ? error : null,
      validationErrors: validationErrors ? validationErrors : null,
      status: 'error' as const,
    })
  ),
  on(profileActions.retweetReplySuccess, (state, { tweet }) => ({
    ...state,
    likes: mapToggleRetweet(state.likes, tweet),
    status: 'success' as const,
  })),
  on(
    profileActions.retweetReplyFailure,
    (state, { error, validationErrors }) => ({
      ...state,
      error: error ? error : null,
      validationErrors: validationErrors ? validationErrors : null,
      status: 'error' as const,
    })
  ),
  on(profileActions.followSucces, (state, { profile }) => ({
    ...state,
    profile,
    status: 'success' as const,
  })),
  on(profileActions.followFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(profileActions.unfollowSucces, (state, { profile }) => ({
    ...state,
    profile,
    status: 'success' as const,
  })),
  on(profileActions.unfollowFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(profileActions.postTweetSuccess, (state, { tweet }) => {
    if (tweet.profile._id === state.profile?._id) {
      return { ...state, tweets: [tweet, ...state.tweets] };
    }
    return { ...state };
  }),
  on(profileActions.postTweetFailure, (state, { error, validationErrors }) => ({
    ...state,
    error: error ? error : null,
    validationErrors: validationErrors ? validationErrors : null,
    status: 'error' as const,
  }))
);
