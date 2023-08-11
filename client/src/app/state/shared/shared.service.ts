import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  TimelineRes,
  GetTweetRes,
  LikeRes,
  PostReplyRes,
  PostReplyToReplyRes,
  GetReplyRes,
  PostTweetRes,
  ReplyRetweetRes,
} from 'src/app/types/Api';

@Injectable()
export class SharedService {
  constructor(private http: HttpClient) {}

  getTimeline() {
    return this.http.get<TimelineRes>('/api/tweet/timeline');
  }

  getFollowingTimeline() {
    return this.http.get<TimelineRes>('/api/tweet/following');
  }

  postTweet(content: string) {
    return this.http.post<PostTweetRes>('/api/tweet', { content });
  }

  retweetTweet(id: string, content: string) {
    return this.http.post<PostTweetRes>(`/api/tweet/${id}/retweet`, {
      content,
    });
  }

  retweetReply(id: string, content: string) {
    return this.http.post<ReplyRetweetRes>(`/api/comment/${id}/retweet`, {
      content,
    });
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
