import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfileComponent } from './page/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileFormComponent } from './component/profile-form/profile-form.component';
import { PasswordFormComponent } from './component/password-form/password-form.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileFormComponent,
    PasswordFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
