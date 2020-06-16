import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaderRoutingModule } from './reader-routing.module';
import { AccountDetailComponent } from './page/account-detail/account-detail.component';
import { ReaderHomeComponent } from './page/reader-home/reader-home.component';
import { EditMembershipComponent } from './component/edit-membership/edit-membership.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ReaderHomeComponent,
    AccountDetailComponent,
    EditMembershipComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReaderRoutingModule
  ]
})
export class ReaderModule { }
