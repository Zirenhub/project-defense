import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { PopUpComponent } from './pop-up/pop-up.component';

@NgModule({
  declarations: [ValidationErrorComponent, PopUpComponent],
  imports: [CommonModule],
  exports: [ValidationErrorComponent, PopUpComponent],
})
export class SharedModule {}
