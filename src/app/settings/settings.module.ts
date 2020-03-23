import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
