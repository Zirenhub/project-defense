import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  openReplyingToTweetModal,
  openRetweetModal,
} from 'src/app/state/modal/modal.actions';
import { likeTweet } from 'src/app/state/shared/shared.actions';
import { Tweet } from 'src/app/types/Tweet';
import { sharedContext } from 'src/app/state/shared/shared.actions';

@Component({
  selector: 'app-tweet-feed',
  templateUrl: './tweet-feed.component.html',
})
export class TweetFeedComponent {
  @Input() tweets: Tweet[] = [];
  @Input() context?: sharedContext;

  constructor(private store: Store<AppState>, private router: Router) {}

  handleOpenReplyModal(id: string) {
    const tweet = this.tweets.find((x) => x._id === id);
    if (tweet && this.context) {
      this.store.dispatch(
        openReplyingToTweetModal({ tweet: tweet, context: this.context })
      );
    }
  }

  handleOpenRetweetModal(id: string) {
    const tweet = this.tweets.find((x) => x._id === id);
    if (tweet && this.context) {
      this.store.dispatch(
        openRetweetModal({ content: tweet, context: this.context })
      );
    }
  }

  like(id: string) {
    if (this.context) {
      console.log(this.context);
      this.store.dispatch(likeTweet({ id, context: this.context }));
    }
  }

  openTweet(id: string) {
    this.router.navigate([`/tweet/${id}`]);
  }
}
