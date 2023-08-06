import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AppState } from '../state/app.state';
import {
  selectSingleReplies,
  selectSingleTweet,
} from '../state/single/single.selectors';
import { Tweet } from '../types/Tweet';
import {
  likeReply,
  likeTweet,
  postReply,
  sharedContext,
} from '../state/shared/shared.actions';
import {
  openReplyingToReplyModal,
  openRetweetModal,
} from '../state/modal/modal.actions';
import { Reply } from '../types/Reply';
import { singleGetTweet } from '../state/single/single.actions';

@Component({
  selector: 'app-singular-tweet',
  templateUrl: './tweet.component.html',
})
export class TweetComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

  context: sharedContext = sharedContext.Single;
  tweetId?: string;

  tweet$: Observable<Tweet | null>;
  replies$: Observable<Reply[] | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private location: Location
  ) {
    this.routeSub = this.route.params.subscribe((params) => {
      this.tweetId = params['id'] as string;
    });

    this.tweet$ = this.store.select(selectSingleTweet);
    this.replies$ = this.store.select(selectSingleReplies);
  }

  back() {
    this.location.back();
  }

  navigateToReply(id: string) {
    this.router.navigateByUrl(`/reply/${id}`);
  }

  reply(reply: string) {
    if (reply && this.tweetId) {
      this.store.dispatch(
        postReply({ id: this.tweetId, content: reply, context: this.context })
      );
    }
  }

  handleOpenRetweetModal(content: Tweet | Reply) {
    this.store.dispatch(openRetweetModal({ content, context: this.context }));
  }

  handleOpenReplyModal(reply: Reply) {
    this.store.dispatch(
      openReplyingToReplyModal({ reply, context: this.context })
    );
  }

  handleLikeTweet(id: string) {
    this.store.dispatch(likeTweet({ id, context: this.context }));
  }
  handleLikeReply(id: string) {
    this.store.dispatch(likeReply({ id, context: this.context }));
  }

  ngOnInit(): void {
    if (this.tweetId) {
      this.store.dispatch(singleGetTweet({ id: this.tweetId }));
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
