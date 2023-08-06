import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AppState } from 'src/app/state/app.state';
import { Tweet } from 'src/app/types/Tweet';
import { Reply } from 'src/app/types/Reply';
import * as replySelectors from 'src/app/state/reply/reply.selectors';
import * as sharedActions from 'src/app/state/shared/shared.actions';
import * as modalActions from 'src/app/state/modal/modal.actions';
import { getReply } from 'src/app/state/reply/reply.actions';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
})
export class ReplyComponent implements OnInit, OnDestroy {
  private routeSub?: Subscription;

  replyId?: string;
  context: sharedActions.sharedContext = sharedActions.sharedContext.Reply;

  tweet$: Observable<Tweet | null>;
  parents$: Observable<Reply[] | null>;
  reply$: Observable<Reply | null>;
  children$: Observable<Reply[] | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private location: Location
  ) {
    this.tweet$ = this.store.select(replySelectors.selectReplyTweet);
    this.parents$ = this.store.select(replySelectors.selectReplyParents);
    this.reply$ = this.store.select(replySelectors.selectReplyReply);
    this.children$ = this.store.select(replySelectors.selectReplyChildren);
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
        sharedActions.postReplyToReply({
          id: this.replyId,
          content: reply,
          context: this.context,
        })
      );
    }
  }

  handleOpenRetweetModal(content: Tweet | Reply) {
    this.store.dispatch(
      modalActions.openRetweetModal({ content, context: this.context })
    );
  }

  handleOpenReplytoReplyModal(reply: Reply) {
    this.store.dispatch(
      modalActions.openReplyingToReplyModal({ reply, context: this.context })
    );
  }

  // FIX THIS, ADD A LISTENER ON REDUCER !!!
  handleOpenReplyToTweetModal(tweet: Tweet) {
    this.store.dispatch(
      modalActions.openReplyingToTweetModal({ tweet, context: this.context })
    );
  }

  handleLikeTweet(id: string) {
    this.store.dispatch(sharedActions.likeTweet({ id, context: this.context }));
  }

  handleLikeReply(id: string) {
    this.store.dispatch(sharedActions.likeReply({ id, context: this.context }));
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
  }
}
