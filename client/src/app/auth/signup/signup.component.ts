import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/shared/validators/password-match-validator';

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

  constructor(private fb: FormBuilder) {}

  register() {}

  handleClose() {
    this.close.emit();
  }
}
