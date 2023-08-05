import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  likeTweet,
  openReplyModal,
  openRetweetModal,
} from 'src/app/state/tweets/tweet.actions';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-tweet-feed',
  templateUrl: './tweet-feed.component.html',
})
export class TweetFeedComponent {
  @Input() tweets: Tweet[] = [];

  constructor(private store: Store<AppState>, private router: Router) {}

  handleOpenReplyModal(id: string) {
    const tweet = this.tweets.find((x) => x._id === id);
    if (tweet) {
      this.store.dispatch(openReplyModal({ id: tweet._id, context: 'tweet' }));
    }
  }

  handleOpenRetweetModal(id: string) {
    const tweet = this.tweets.find((x) => x._id === id);
    if (tweet) {
      this.store.dispatch(
        openRetweetModal({ id: tweet._id, context: 'tweet' })
      );
    }
  }

  like(id: string) {
    this.store.dispatch(likeTweet({ id, isOnProfile: false }));
  }

  openTweet(id: string) {
    this.router.navigate([`/tweet/${id}`]);
  }
}
