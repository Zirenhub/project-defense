import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { clearTweetError } from 'src/app/state/tweets/tweet.actions';
import {
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

  private errorSubscription: Subscription;
  private validationErrorsSubscription: Subscription;

  error: string | null = null;
  validationErrors: ValidationErrors | null = null;

  constructor(private store: Store<AppState>) {
    this.error$ = this.store.select(selectTweetError);
    this.validationErrors$ = this.store.select(selectTweetValidationErrors);

    this.errorSubscription = this.error$.subscribe((error) => {
      this.error = error;
    });

    this.validationErrorsSubscription = this.validationErrors$.subscribe(
      (validationErrors) => {
        this.validationErrors = validationErrors;
      }
    );
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
