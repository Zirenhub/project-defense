import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AppState } from '../state/app.state';
import {
  getTweet,
  likeReply,
  likeTweet,
  openReplyModal,
  openRetweetModal,
  postReply,
} from '../state/tweets/tweet.actions';
import { selectTweetSingle } from '../state/tweets/tweet.selectors';
import { Single } from '../state/tweets/tweet.reducer';
import { Reply } from '../types/Reply';
import { Tweet } from '../types/Tweet';

@Component({
  selector: 'app-singular-tweet',
  templateUrl: './tweet.component.html',
})
export class TweetComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  tweetId?: string;

  tweet$: Observable<Single | null>;
  tweetSub: Subscription;

  tweet?: Tweet;
  replies?: Reply[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private location: Location
  ) {
    this.routeSub = this.route.params.subscribe((params) => {
      this.tweetId = params['id'] as string;
    });

    this.tweet$ = this.store.select(selectTweetSingle);

    this.tweetSub = this.tweet$.subscribe((tweet) => {
      if (tweet) {
        this.tweet = tweet.tweet;
        this.replies = tweet.replies;
      }
    });
  }

  back() {
    this.location.back();
  }

  navigateToReply(id: string) {
    this.router.navigateByUrl(`/reply/${id}`);
  }

  reply(reply: string) {
    if (reply && this.tweetId) {
      this.store.dispatch(postReply({ id: this.tweetId, content: reply }));
    }
  }

  retweet(id: string, context: 'tweet' | 'reply') {
    this.store.dispatch(openRetweetModal({ id, context }));
  }

  commentReply(id: string) {
    this.store.dispatch(openReplyModal({ id, context: 'reply' }));
  }

  like(id: string, type: 'tweet' | 'reply') {
    if (type === 'tweet') {
      this.store.dispatch(likeTweet({ id, isOnProfile: false }));
    } else {
      this.store.dispatch(likeReply({ id, isOnProfile: false }));
    }
  }

  ngOnInit(): void {
    if (this.tweetId) {
      this.store.dispatch(getTweet({ id: this.tweetId }));
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.tweetSub.unsubscribe();
  }
}
