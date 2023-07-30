import { Tweet } from './Tweet';
import { User } from './User';

export interface Reply {
  profile: User;
  tweet: Tweet;
  content: string;
  parent: string | null;
  repliesCount: number;
  retweetsCount: number;
  likesCount: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReplyHierarchy {
  tweet: Tweet;
  replies: Reply[];
}
