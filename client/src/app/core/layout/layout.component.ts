import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import {
  clearTweetError,
  closeReplyingToModal,
} from 'src/app/state/tweets/tweet.actions';
import {
  selectReplyingToReply,
  selectReplyingToTweet,
  selectTweetError,
  selectTweetValidationErrors,
} from 'src/app/state/tweets/tweet.selectors';
import { ValidationErrors } from 'src/app/types/Api';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnDestroy {
  error$: Observable<string | null>;
  validationErrors$: Observable<ValidationErrors | null>;
  replyingToTweet$: Observable<Tweet | null>;
  replyingToReply$: Observable<Reply | null>;

  replyText: string = '';

  private errorSubscription: Subscription;
  private validationErrorsSubscription: Subscription;

  error: string | null = null;
  validationErrors: ValidationErrors | null = null;

  constructor(private store: Store<AppState>) {
    this.error$ = this.store.select(selectTweetError);
    this.validationErrors$ = this.store.select(selectTweetValidationErrors);
    this.replyingToTweet$ = this.store.select(selectReplyingToTweet);
    this.replyingToReply$ = this.store.select(selectReplyingToReply);

    this.errorSubscription = this.error$.subscribe((error) => {
      this.error = error;
    });

    this.validationErrorsSubscription = this.validationErrors$.subscribe(
      (validationErrors) => {
        this.validationErrors = validationErrors;
      }
    );
  }

  closeReplyingTo() {
    this.store.dispatch(closeReplyingToModal());
  }

  reply() {
    // if (this.replyText ) {
    //   this.store.dispatch(
    //     postReply({ id: this.tweetId, content: this.replyText })
    //   );
    //   this.replyText = '';
    // }
  }

  removeErrors() {
    if (this.error || this.validationErrors) {
      this.store.dispatch(clearTweetError());
    }
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.validationErrorsSubscription.unsubscribe();
  }
}
