import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaderRoutingModule } from './reader-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { ReaderHomeComponent } from './reader-home/reader-home.component';
import { EditMembershipComponent } from './edit-membership/edit-membership.component';
import { ProfileComponent } from './profile/profile.component';


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
