import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GetProfileLikes,
  GetProfileRes,
  ProfileTweetsRes,
} from 'src/app/types/Api';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfileTweets(id: string) {
    return this.http.get<ProfileTweetsRes>(`/api/profile/${id}/tweets`);
  }

  getProfileLikes(id: string) {
    return this.http.get<GetProfileLikes>(`/api/profile/${id}/likes`);
  }

  getProfile(id: string) {
    return this.http.get<GetProfileRes>(`/api/profile/${id}`);
  }
}
