import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
})
export class ValidationErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = 'Field';

  getErrorMessage(errorKey: string, errorValue: any): string {
    const errorMessages: any = {
      required: `${this.fieldName} is required.`,
      minlength: `${this.fieldName} must be at least ${errorValue.requiredLength} characters long.`,
      maxlength: `${this.fieldName} cannot exceed ${errorValue.requiredLength} characters.`,
      passwordMatch: `${this.fieldName} doesn't match.`,
    };

    const errorMessage = errorMessages[errorKey];
    return errorMessage ? errorMessage : `Invalid ${this.fieldName}.`;
  }
}
