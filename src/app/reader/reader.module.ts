import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaderRoutingModule } from './reader-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { ReaderHomeComponent } from './reader-home/reader-home.component';


@NgModule({
  declarations: [
    ReaderHomeComponent,
    AccountDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReaderRoutingModule
  ]
})
export class ReaderModule { }
