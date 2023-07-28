import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { clearError, login, signup } from 'src/app/state/auth/auth.actions';
import { AuthStateStatus } from 'src/app/state/auth/auth.reducer';
import {
  selectAuthError,
  selectAuthStatus,
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

  signUpError$: Observable<string | null>;
  signUpValidationErrors$: Observable<ValidationErrors | null>;
  signUpStatus$: Observable<AuthStateStatus>;

  private signUpStatusSub: Subscription;
  error: string | null = null;
  validationErrors: ValidationErrors | null = null;

  constructor(private store: Store<AppState>) {
    this.signUpError$ = this.store.select(selectAuthError);
    this.signUpValidationErrors$ = this.store.select(
      selectAuthValidationErrors
    );
    this.signUpStatus$ = this.store.select(selectAuthStatus);

    this.signUpStatusSub = this.signUpStatus$.subscribe((status) => {
      if (status === 'success') {
        // signup or login, doesnt matter, close the modal
        this.closeModal();
      } else if (status === 'error') {
        // only take the first error emitted and then automatically unsubscribe
        this.signUpError$.pipe(take(1)).subscribe((error) => {
          this.error = error;
        });
      } else if (status === 'validationErrors') {
        this.signUpValidationErrors$.pipe(take(1)).subscribe((error) => {
          this.validationErrors = error;
        });
      }
    });
  }

  openModal(modal: 'signup' | 'login') {
    this.currentOpenModal = modal;
  }

  removeErrors() {
    if (this.error || this.validationErrors) {
      // if there is an error, clear it so when the next time modal is opened
      // we dont show the error again.
      this.store.dispatch(clearError());
      this.error = null;
      this.validationErrors = null;
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
    this.signUpStatusSub.unsubscribe();
  }
}
