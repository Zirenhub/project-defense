import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { LogIn } from 'src/app/types/Auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Output() close = new EventEmitter();
  @Output() login = new EventEmitter<LogIn>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(18)]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(16)],
    ],
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  handleClose() {
    this.close.emit();
  }

  handleLogin() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value as {
      email: string;
      password: string;
    };
    this.login.emit({ email, password });
  }
}
