import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import * as tweetActions from 'src/app/state/tweets/tweet.actions';
import { ReplyingTo } from 'src/app/state/tweets/tweet.reducer';
import * as tweetSelectors from 'src/app/state/tweets/tweet.selectors';
import { ValidationErrors } from 'src/app/types/Api';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnDestroy {
  error$: Observable<string | null>;
  validationErrors$: Observable<ValidationErrors | null>;
  replyingTo$: Observable<ReplyingTo | null>;
  tweetModal$: Observable<boolean>;
  retweetTo$: Observable<ReplyingTo | null>;

  replyText: string = '';
  postText: string = '';
  retweetText: string = '';

  private errorSubscription: Subscription;
  private validationErrorsSubscription: Subscription;

  error: string | null = null;
  validationErrors: ValidationErrors | null = null;
  user: User | null = null;

  constructor(private store: Store<AppState>) {
    this.error$ = this.store.select(tweetSelectors.selectTweetError);
    this.validationErrors$ = this.store.select(
      tweetSelectors.selectTweetValidationErrors
    );
    this.replyingTo$ = this.store.select(tweetSelectors.selectReplyingTo);
    this.tweetModal$ = this.store.select(tweetSelectors.selectTweetModal);
    this.retweetTo$ = this.store.select(tweetSelectors.selectRetweetTo);

    this.errorSubscription = this.error$.subscribe((error) => {
      this.error = error;
    });

    this.validationErrorsSubscription = this.validationErrors$.subscribe(
      (validationErrors) => {
        this.validationErrors = validationErrors;
      }
    );
  }

  handleCloseReplyingTo() {
    this.store.dispatch(tweetActions.closeReplyingToModal());
  }

  handleCloseTweetModal() {
    this.store.dispatch(tweetActions.closeTweetModal());
  }

  handleCloseRetweetModal() {
    this.store.dispatch(tweetActions.closeRetweetModal());
  }

  reply(id: string, type: 'tweet' | 'reply') {
    if (this.replyText) {
      if (type === 'reply') {
        this.store.dispatch(
          tweetActions.postReplyToReply({ id, content: this.replyText })
        );
      } else {
        this.store.dispatch(
          tweetActions.postReply({ id, content: this.replyText })
        );
      }
    }
    this.replyText = '';
    this.handleCloseReplyingTo();
  }

  post() {
    if (this.postText) {
      this.store.dispatch(tweetActions.postTweet({ content: this.postText }));
    }
    this.postText = '';
    this.handleCloseTweetModal();
  }

  retweet(id: string, type: 'tweet' | 'reply') {
    if (this.retweetText) {
      if (type === 'tweet') {
        this.store.dispatch(
          tweetActions.retweetTweet({ id, content: this.retweetText })
        );
      }
      if (type === 'reply') {
        this.store.dispatch(
          tweetActions.retweetReply({ id, content: this.retweetText })
        );
      }
    }
    this.handleCloseRetweetModal();
  }

  removeErrors() {
    if (this.error || this.validationErrors) {
      this.store.dispatch(tweetActions.clearTweetError());
    }
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.validationErrorsSubscription.unsubscribe();
  }
}
