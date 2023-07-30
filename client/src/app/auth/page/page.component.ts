import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { clearAuthError, login, signup } from 'src/app/state/auth/auth.actions';
import {
  selectAuthError,
  selectAuthValidationErrors,
} from 'src/app/state/auth/auth.selectors';
import { ValidationErrors } from 'src/app/types/Api';
import { LogIn, SignUp } from 'src/app/types/Auth';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnDestroy {
  currentOpenModal: 'signup' | 'login' | null = null;

  error$: Observable<string | null>;
  validationErrors$: Observable<ValidationErrors | null>;

  private errorSubscription: Subscription;
  private validationErrorsSubscription: Subscription;

  error: string | null = null;
  validationErrors: ValidationErrors | null = null;

  constructor(private store: Store<AppState>) {
    this.error$ = this.store.select(selectAuthError);
    this.validationErrors$ = this.store.select(selectAuthValidationErrors);

    this.errorSubscription = this.error$.subscribe((error) => {
      this.error = error;
    });

    this.validationErrorsSubscription = this.validationErrors$.subscribe(
      (validationErrors) => {
        this.validationErrors = validationErrors;
      }
    );
  }

  openModal(modal: 'signup' | 'login') {
    this.currentOpenModal = modal;
  }

  removeErrors() {
    if (this.error || this.validationErrors) {
      // if there is an error, clear it so when the next time modal is opened
      // we dont show the error again.
      this.store.dispatch(clearAuthError());
    }
  }

  closeModal() {
    this.removeErrors();
    this.currentOpenModal = null;
  }

  register(data: SignUp) {
    this.store.dispatch(signup(data));
  }

  login(data: LogIn) {
    this.store.dispatch(login(data));
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.validationErrorsSubscription.unsubscribe();
  }
}
