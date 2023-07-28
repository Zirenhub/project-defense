import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { passwordMatchValidator } from 'src/app/shared/validators/password-match-validator';
import { AppState } from 'src/app/state/app.state';
import { signup } from 'src/app/state/auth/auth.actions';

type passwordGroupT = {
  password: string;
  rePassword: string;
};

type form = {
  firstName: string;
  lastName: string;
  at: string;
  email: string;
  passwordGroup: passwordGroupT;
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  @Output() close = new EventEmitter();

  form = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(12)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(12)],
    ],
    at: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(12)],
    ],
    email: ['', [Validators.required, Validators.maxLength(18)]],
    passwordGroup: this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [passwordMatchValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  register() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const { firstName, lastName, at, email, passwordGroup } = this.form
      .value as form;
    const { password } = passwordGroup;
    this.store.dispatch(signup({ firstName, lastName, at, email, password }));
    // close modal if signup is successful
    // show error and dont close otherwise
    // console.log(this.store.select('auth'));
  }

  handleClose() {
    this.close.emit();
  }
}
