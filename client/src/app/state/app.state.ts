import { AuthState } from './auth/auth.reducer';
import { ProfileState } from './profile/profile.reducer';
import { TweetState } from './tweets/tweet.reducer';

export interface AppState {
  tweets: TweetState;
  auth: AuthState;
  profile: ProfileState;
}
