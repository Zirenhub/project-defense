import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent, PageComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
