import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaderRoutingModule } from './reader-routing.module';
import { AccountDetailComponent } from './page/account-detail/account-detail.component';
import { ReaderHomeComponent } from './page/reader-home/reader-home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberFormComponent } from './component/member-form/member-form.component';


@NgModule({
  declarations: [
    ReaderHomeComponent,
    AccountDetailComponent,
    ProfileComponent,
    MemberFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReaderRoutingModule
  ]
})
export class ReaderModule { }
