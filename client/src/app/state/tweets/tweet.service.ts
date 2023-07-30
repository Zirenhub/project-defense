import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimelineRes, GetTweetRes } from 'src/app/types/Api';

@Injectable()
export class TweetService {
  constructor(private http: HttpClient) {}

  getTimeline() {
    return this.http.get<TimelineRes>('/api/tweet/timeline');
  }

  getTweet(id: string) {
    return this.http.get<GetTweetRes>(`/api/tweet/${id}`);
  }
}
