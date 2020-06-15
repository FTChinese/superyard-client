import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OauthRoutingModule } from './oauth-routing.module';
import { RegistryComponent } from './registry/registry.component';
import { NewAppComponent } from './new-app/new-app.component';
import { UpdateAppComponent } from './update-app/update-app.component';
import { KeyListComponent } from './key-list/key-list.component';
import { AppListComponent } from './app-list/app-list.component';
import { AppFormComponent } from './app-form/app-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegistryComponent,
    NewAppComponent,
    UpdateAppComponent,
    KeyListComponent,
    AppListComponent,
    AppFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OauthRoutingModule
  ]
})
export class OauthModule { }
