import { Reply } from './Reply';
import { User } from './User';

export interface Tweet {
  retweet: {
    originalModel: 'Tweet' | 'Comment' | null;
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

export interface ReplyRetweet extends Tweet {
  retweet: { originalModel: 'Comment'; original: Reply };
}

export interface TweetRetweet extends Tweet {
  retweet: { originalModel: 'Tweet'; original: Tweet };
}
