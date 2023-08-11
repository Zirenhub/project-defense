import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { sharedContext } from 'src/app/state/shared/shared.actions';
import {
  getFollowingTimeline,
  getTimeline,
} from 'src/app/state/timeline/timeline.actions';
import { selectTimelineTweets } from 'src/app/state/timeline/timeline.selectors';
import { Tweet } from 'src/app/types/Tweet';
import * as sharedActions from '../../state/shared/shared.actions';

type Pages = 'For you' | 'Following';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent {
  postContent: string = '';

  pages: Pages[] = ['For you', 'Following'];
  activePage = this.pages[0];

  context: sharedContext = sharedContext.Timeline;
  timeline$: Observable<Tweet[] | null>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(getTimeline());
    this.timeline$ = this.store.select(selectTimelineTweets);
  }

  handleActivePageInit(page: Pages) {
    if (page === 'For you') {
      this.store.dispatch(getTimeline());
    }
    if (page === 'Following') {
      this.store.dispatch(getFollowingTimeline());
    }
  }

  handleActivePage(page: Pages) {
    this.handleActivePageInit(page);
    this.activePage = page;
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
}
