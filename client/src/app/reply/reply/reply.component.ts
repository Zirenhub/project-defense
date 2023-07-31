import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AppState } from 'src/app/state/app.state';
import {
  getReply,
  likeReply,
  likeTweet,
  openReplyModal,
  openRetweetModal,
  postReplyToReply,
} from 'src/app/state/tweets/tweet.actions';
import { IReply } from 'src/app/state/tweets/tweet.reducer';
import { selectTweetReply } from 'src/app/state/tweets/tweet.selectors';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
})
export class ReplyComponent implements OnInit, OnDestroy {
  private routeSub?: Subscription;
  replyId?: string;

  fullReply$: Observable<IReply | null>;
  replySub: Subscription;

  tweet?: Tweet;
  parents?: Reply[];
  reply?: Reply;
  children?: Reply[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private location: Location
  ) {
    this.fullReply$ = this.store.select(selectTweetReply);

    this.replySub = this.fullReply$.subscribe((fullReply) => {
      if (fullReply) {
        this.tweet = fullReply.tweet;
        this.parents = fullReply.parents;
        this.reply = fullReply.reply;
        this.children = fullReply.children;
      }
    });
  }

  navigate(id: string, type: 'tweet' | 'reply') {
    this.router.navigate([`/${type}/` + id]);
  }

  back() {
    this.location.back();
  }

  handleReply(reply: string) {
    if (reply && this.replyId) {
      this.store.dispatch(
        postReplyToReply({ id: this.replyId, content: reply })
      );
    }
  }

  handleRetweet(id: string, context: 'tweet' | 'reply') {
    this.store.dispatch(openRetweetModal({ id, context }));
  }

  commentReply(id: string, context: 'tweet' | 'reply') {
    this.store.dispatch(openReplyModal({ id, context }));
  }

  like(id: string, type: 'tweet' | 'reply') {
    if (type === 'tweet') {
      this.store.dispatch(likeTweet({ id, isOnProfile: false }));
    } else {
      this.store.dispatch(likeReply({ id, isOnProfile: false }));
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.replyId = params['id'] as string;
      if (this.replyId) {
        this.store.dispatch(getReply({ id: this.replyId }));
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.replySub.unsubscribe();
  }
}
