import { createReducer, on } from '@ngrx/store';
import { Tweet } from 'src/app/types/Tweet';
import { Reply } from 'src/app/types/Reply';
import {
  profileFailure,
  profileLikesFailure,
  profileLikesSuccess,
  profileSuccess,
  profileTweetsFailure,
  profileTweetsSuccess,
} from './profile.actions';
import { User } from 'src/app/types/User';

export interface ProfileState {
  profile: User | null;
  tweets: Tweet[];
  replies: Reply[];
  likes: (Tweet | Reply)[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'validationErrors' | 'success';
}

export const initialState: ProfileState = {
  profile: null,
  tweets: [],
  replies: [],
  likes: [],
  error: null,
  status: 'pending',
};

export const profileReducer = createReducer(
  initialState,
  on(profileTweetsSuccess, (state, { tweets }) => ({
    ...state,
    tweets,
    status: 'success' as const,
  })),
  on(profileTweetsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(profileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    status: 'success' as const,
  })),
  on(profileFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(profileLikesSuccess, (state, { likes }) => ({
    ...state,
    likes,
    status: 'success' as const,
  })),
  on(profileLikesFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);
