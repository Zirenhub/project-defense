import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../state/app.state';
import {
  getTweet,
  likeReply,
  likeTweet,
  postReply,
} from '../state/tweets/tweet.actions';
import { Tweet } from '../types/Tweet';
import { Reply } from '../types/Reply';
import {
  selectTweetReplies,
  selectTweet,
} from '../state/tweets/tweet.selectors';

@Component({
  selector: 'app-singular-tweet',
  templateUrl: './tweet.component.html',
})
export class TweetComponent implements OnInit, OnDestroy {
  // sub to error and show error pop up

  private routeSub: Subscription;
  tweetId?: string;

  tweet$: Observable<Tweet>;
  replies$: Observable<Reply[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location
  ) {
    this.routeSub = this.route.params.subscribe((params) => {
      this.tweetId = params['id'] as string;
    });

    this.tweet$ = this.store.select(selectTweet);
    this.replies$ = this.store.select(selectTweetReplies);
  }

  replyText: string = '';

  reply() {
    if (this.replyText && this.tweetId) {
      this.store.dispatch(
        postReply({ id: this.tweetId, content: this.replyText })
      );
      this.replyText = '';
    }
  }

  like(id: string, type: 'tweet' | 'reply') {
    if (type === 'tweet') {
      this.store.dispatch(likeTweet({ id }));
    } else {
      this.store.dispatch(likeReply({ id }));
    }
  }

  back() {
    this.location.back();
  }

  ngOnInit(): void {
    if (this.tweetId) {
      this.store.dispatch(getTweet({ id: this.tweetId }));
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
