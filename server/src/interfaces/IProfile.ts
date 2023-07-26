import { Types } from 'mongoose';

export interface IProfile {
  firstName: string;
  lastName: string;
  at: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  bio: string | null;
  birthday: Date;
  profilePic: string | null;
}
