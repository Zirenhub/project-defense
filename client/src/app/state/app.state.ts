import { AuthState } from './auth/auth.reducer';
import { TweetState } from './tweets/tweet.reducer';

export interface AppState {
  tweets: TweetState;
  auth: AuthState;
}
