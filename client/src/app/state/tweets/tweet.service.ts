import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  TimelineRes,
  GetTweetRes,
  LikeRes,
  PostReplyRes,
  PostReplyToReplyRes,
  GetReplyRes,
} from 'src/app/types/Api';

@Injectable()
export class TweetService {
  constructor(private http: HttpClient) {}

  getTimeline() {
    return this.http.get<TimelineRes>('/api/tweet/timeline');
  }

  getTweet(id: string) {
    return this.http.get<GetTweetRes>(`/api/tweet/${id}`);
  }

  getReply(id: string) {
    return this.http.get<GetReplyRes>(`/api/comment/${id}/`);
  }

  postReply(id: string, content: string) {
    return this.http.post<PostReplyRes>(`/api/tweet/${id}`, { content });
  }

  likeTweet(id: string) {
    return this.http.post<LikeRes>(`/api/tweet/${id}/like`, {});
  }

  likeReply(id: string) {
    return this.http.post<LikeRes>(`/api/comment/${id}/like`, {});
  }

  postReplyToReply(id: string, content: string) {
    return this.http.post<PostReplyToReplyRes>(`/api/comment/${id}`, {
      content,
    });
  }
}
