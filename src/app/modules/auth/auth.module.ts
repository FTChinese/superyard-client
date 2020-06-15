import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
