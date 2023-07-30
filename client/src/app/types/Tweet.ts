import { Reply } from './Reply';
import { User } from './User';

export interface Tweet {
  retweet: {
    originalModel: 'tweet' | 'reply' | null;
    original: Tweet | Reply | null;
  };
  _id: string;
  profile: User;
  content: string;
  image: string | null;
  repliesCount: number;
  retweetsCount: number;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  isRetweeted: boolean;
  __v: number;
}
