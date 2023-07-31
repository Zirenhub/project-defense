import { JWTUser } from './Auth';
import { FullReply, Reply, ReplyHierarchy } from './Reply';
import { ReplyRetweet, Tweet } from './Tweet';
import { User } from './User';

export type ValidationErrors = { msg: string }[];

export interface Api {
  status: 'success' | 'error';
  data?: any;
  errors?: ValidationErrors | null;
  message: string | null;
}

export interface SignUpRes extends Api {
  data: User;
}

export interface CheckAuthRes extends Api {
  data: JWTUser;
}

export interface TimelineRes extends Api {
  data: Tweet[];
}

export interface GetTweetRes extends Api {
  data: ReplyHierarchy;
}

export interface LikeRes extends Api {
  data: { _id: string; likeOrDislike: 'like' | 'dislike' };
}

export interface PostReplyRes extends Api {
  data: Reply;
}

export interface PostReplyToReplyRes extends Api {
  data: Reply;
}

export interface GetReplyRes extends Api {
  data: FullReply;
}

export interface PostTweetRes extends Api {
  data: Tweet;
}

export interface ReplyRetweetRes extends Api {
  data: ReplyRetweet;
}

export interface ProfileTweetsRes extends Api {
  data: Tweet[];
}

export interface GetProfileRes extends Api {
  data: User;
}

export interface GetProfileLikes extends Api {
  data: (Tweet | Reply)[];
}
