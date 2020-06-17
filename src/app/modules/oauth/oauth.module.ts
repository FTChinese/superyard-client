import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OauthRoutingModule } from './oauth-routing.module';
import { AppListComponent } from './page/app-list/app-list.component';
import { NewAppComponent } from './page/new-app/new-app.component';
import { UpdateAppComponent } from './page/update-app/update-app.component';
import { KeyListComponent } from './page/key-list/key-list.component';
import { AppFormComponent } from './component/app-form/app-form.component';
import { RegistryComponent } from './component/registry/registry.component';
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
