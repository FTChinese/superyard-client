import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OauthRoutingModule } from './oauth-routing.module';
import { AppListComponent } from './page/app-list/app-list.component';
import { AppFormComponent } from './component/app-form/app-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppItemComponent } from './component/app-item/app-item.component';
import { TokenListComponent } from './component/token-list/token-list.component';
import { PersonalKeysComponent } from './page/personal-keys/personal-keys.component';
import { AppDetailComponent } from './page/app-detail/app-detail.component';
import { TokenFormComponent } from './component/token-form/token-form.component';

@NgModule({
  declarations: [
    AppListComponent,
    AppFormComponent,
    AppItemComponent,
    TokenListComponent,
    PersonalKeysComponent,
    AppDetailComponent,
    TokenFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OauthRoutingModule
  ]
})
export class OauthModule { }
