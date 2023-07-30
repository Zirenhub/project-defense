import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../state/app.state';
import { getTweet } from '../state/tweets/tweet.actions';
import { Tweet } from '../types/Tweet';
import { Reply } from '../types/Reply';
import { selectReplies, selectTweet } from '../state/tweets/tweet.selectors';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
})
export class TweetComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  tweetId?: string;

  tweet$: Observable<Tweet>;
  replies$: Observable<Reply[]>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.routeSub = this.route.params.subscribe((params) => {
      this.tweetId = params['id'] as string;
    });

    this.tweet$ = this.store.select(selectTweet);
    this.replies$ = this.store.select(selectReplies);
  }

  replyText: string = '';

  reply() {
    if (this.replyText) {
      console.log('reply');
    }
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
