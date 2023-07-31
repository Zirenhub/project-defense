import { Tweet } from './Tweet';
import { User } from './User';

export interface Reply {
  profile: User;
  tweet: Tweet;
  content: string;
  image: string | null;
  parent: Reply | string | null;
  repliesCount: number;
  retweetsCount: number;
  likesCount: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isLiked: boolean;
  isRetweeted: boolean;
}

export interface ReplyWithParent extends Reply {
  parent: Reply;
}

export interface ReplyHierarchy {
  tweet: Tweet;
  replies: Reply[];
}

export interface FullReply {
  tweet: Tweet;
  parents: Reply[];
  reply: Reply;
  children: Reply[];
}
