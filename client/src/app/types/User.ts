export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  at: string;
  followers: string[];
  following: string[];
  bio: string | null;
  birthday: string;
  profilePic: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
