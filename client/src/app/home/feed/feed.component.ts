import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import {
  getTimeline,
  openReplyTweetModal,
} from 'src/app/state/tweets/tweet.actions';
import { Timeline } from 'src/app/state/tweets/tweet.reducer';
import { selectTweetTimline } from 'src/app/state/tweets/tweet.selectors';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnDestroy {
  timeline: Tweet[] = [];

  timeline$: Observable<Timeline | null>;
  timelineSub: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(getTimeline());
    this.timeline$ = this.store.select(selectTweetTimline);

    this.timelineSub = this.timeline$.subscribe((timeline) => {
      if (timeline) {
        this.timeline = timeline.tweets;
      }
    });
  }

  openReplyModal(id: string) {
    const tweet = this.timeline.find((x) => x._id === id);
    if (tweet) {
      this.store.dispatch(openReplyTweetModal({ id: tweet._id }));
    }
  }

  openTweet(id: string) {
    this.router.navigate([`/tweet/${id}`]);
  }

  ngOnDestroy(): void {
    this.timelineSub.unsubscribe();
  }
}
