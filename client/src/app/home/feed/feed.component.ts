import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { sharedContext } from 'src/app/state/shared/shared.actions';
import { getTimeline } from 'src/app/state/timeline/timeline.actions';
import { selectTimelineTweets } from 'src/app/state/timeline/timeline.selectors';
import { Tweet } from 'src/app/types/Tweet';
import * as sharedActions from '../../state/shared/shared.actions';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnDestroy {
  postContent: string = '';

  timeline: Tweet[] = [];
  context: sharedContext = sharedContext.Timeline;

  timeline$: Observable<Tweet[] | null>;
  timelineSub: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(getTimeline());
    this.timeline$ = this.store.select(selectTimelineTweets);

    this.timelineSub = this.timeline$.subscribe((timeline) => {
      if (timeline) {
        this.timeline = timeline;
      }
    });
  }

  handlePost() {
    if (this.postContent) {
      this.store.dispatch(
        sharedActions.postTweet({
          content: this.postContent,
          context: this.context,
        })
      );
    }
    this.postContent = '';
  }

  ngOnDestroy(): void {
    this.timelineSub.unsubscribe();
  }
}
