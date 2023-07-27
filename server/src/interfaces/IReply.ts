import { MongooseProfile } from './IProfile';

export interface IReply {
  profile: MongooseProfile;
  tweet: string;
  repliesCount: number;
  retweetsCount: number;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  parent: string | null;
}
