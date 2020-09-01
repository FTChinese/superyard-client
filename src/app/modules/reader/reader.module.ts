import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaderRoutingModule } from './reader-routing.module';
import { AccountDetailComponent } from './page/account-detail/account-detail.component';
import { ReaderHomeComponent } from './page/reader-home/reader-home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberFormComponent } from './component/member-form/member-form.component';
import { OrdersComponent } from './page/orders/orders.component';
import { MemberCardComponent } from './component/member-card/member-card.component';
import { AccountCardComponent } from './component/account-card/account-card.component';
import { SandboxComponent } from './page/sandbox/sandbox.component';


@NgModule({
  declarations: [
    ReaderHomeComponent,
    AccountDetailComponent,
    ProfileComponent,
    MemberFormComponent,
    OrdersComponent,
    MemberCardComponent,
    AccountCardComponent,
    SandboxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReaderRoutingModule
  ]
})
export class ReaderModule { }
