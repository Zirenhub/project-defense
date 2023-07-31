import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import {
  clearTweetError,
  closeReplyingToModal,
  postReply,
  postReplyToReply,
} from 'src/app/state/tweets/tweet.actions';
import { ReplyingTo } from 'src/app/state/tweets/tweet.reducer';
import {
  selectReplyingTo,
  selectTweetError,
  selectTweetValidationErrors,
} from 'src/app/state/tweets/tweet.selectors';
import { ValidationErrors } from 'src/app/types/Api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnDestroy {
  error$: Observable<string | null>;
  validationErrors$: Observable<ValidationErrors | null>;
  replyingTo$: Observable<ReplyingTo | null>;

  replyText: string = '';

  private errorSubscription: Subscription;
  private validationErrorsSubscription: Subscription;

  error: string | null = null;
  validationErrors: ValidationErrors | null = null;

  constructor(private store: Store<AppState>) {
    this.error$ = this.store.select(selectTweetError);
    this.validationErrors$ = this.store.select(selectTweetValidationErrors);
    this.replyingTo$ = this.store.select(selectReplyingTo);

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

  reply(id: string, type: 'tweet' | 'reply') {
    if (this.replyText) {
      if (type === 'reply') {
        this.store.dispatch(postReplyToReply({ id, content: this.replyText }));
      } else {
        this.store.dispatch(postReply({ id, content: this.replyText }));
      }
    }
    this.replyText = '';
    this.closeReplyingTo();
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
