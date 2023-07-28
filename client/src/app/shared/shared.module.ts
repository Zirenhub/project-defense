import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from './validation-error/validation-error.component';

@NgModule({
  declarations: [ValidationErrorComponent],
  imports: [CommonModule],
  exports: [ValidationErrorComponent],
})
export class SharedModule {}
