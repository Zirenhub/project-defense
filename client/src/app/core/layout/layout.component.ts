import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import * as modalActions from '../../state/modal/modal.actions';
import * as modalSelectors from '../../state/modal/modal.selectors';
import * as sharedActions from '../../state/shared/shared.actions';
import { ValidationErrors } from 'src/app/types/Api';
import { User } from 'src/app/types/User';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';
import { sharedContext } from 'src/app/state/shared/shared.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnDestroy {
  postModalIsOpen: boolean = false;

  contextSub: Subscription;

  replyingToReply$: Observable<Reply | null>;
  replyingToTweet$: Observable<Tweet | null>;
  retweetingModal$: Observable<Reply | Tweet | null>;
  context$: Observable<sharedContext>;

  postText: string = '';
  retweetText: string = '';

  error: string | null = null;
  validationErrors: ValidationErrors | null = null;
  user: User | null = null;
  context?: sharedContext;

  constructor(private store: Store<AppState>) {
    // store error inside shared state???

    // this.error$ = this.store.select(tweetSelectors.selectTweetError);
    // this.validationErrors$ = this.store.select(
    //   tweetSelectors.selectTweetValidationErrors
    // );
    this.replyingToReply$ = this.store.select(
      modalSelectors.selectModalReplyingToReply
    );
    this.replyingToTweet$ = this.store.select(
      modalSelectors.selectModalReplyingToTweet
    );
    this.retweetingModal$ = this.store.select(
      modalSelectors.selectModalRetweet
    );
    this.context$ = this.store.select(modalSelectors.selectModalContext);

    this.contextSub = this.context$.subscribe((context) => {
      this.context = context;
    });
  }

  togglePostModal() {
    this.postModalIsOpen = !this.postModalIsOpen;
  }

  handleCloseReplyingTo() {
    this.store.dispatch(modalActions.closeReplyingToReplyModal());
  }

  handleCloseTweetModal() {
    this.store.dispatch(modalActions.closeReplyingToTweetModal());
  }

  handleCloseRetweetModal() {
    this.store.dispatch(modalActions.closeRetweetModal());
  }

  replyToReply(content: string, replyId: string) {
    if (this.context) {
      this.store.dispatch(
        sharedActions.postReplyToReply({
          id: replyId,
          content,
          context: this.context,
        })
      );
    }
    this.handleCloseReplyingTo();
  }

  replyToTweet(content: string, tweetId: string) {
    if (this.context) {
      this.store.dispatch(
        sharedActions.postReply({
          id: tweetId,
          content,
          context: this.context,
        })
      );
    }
    this.handleCloseTweetModal();
  }

  post() {
    if (this.postText && this.context) {
      this.store.dispatch(
        sharedActions.postTweet({
          content: this.postText,
          context: this.context,
        })
      );
    }
    this.postText = '';
    this.togglePostModal();
  }

  retweet(content: Tweet | Reply) {
    if (this.retweetText && this.context) {
      if ('parent' in content) {
        this.store.dispatch(
          sharedActions.retweetReply({
            id: content._id,
            content: this.retweetText,
            context: this.context,
          })
        );
      }
      this.store.dispatch(
        sharedActions.retweetTweet({
          id: content._id,
          content: this.retweetText,
          context: this.context,
        })
      );
    }
    this.handleCloseRetweetModal();
  }

  // removeErrors() {
  //   if (this.error || this.validationErrors) {
  //     this.store.dispatch(modalActions.clear());
  //   }
  // }

  ngOnDestroy(): void {
    this.contextSub.unsubscribe();
  }
}
