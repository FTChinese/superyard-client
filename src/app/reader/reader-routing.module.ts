import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { ReaderHomeComponent } from './reader-home/reader-home.component';


const routes: Routes = [
  {
    path: '',
    component: ReaderHomeComponent,
  },
  {
    path: 'ftc/:id',
    component: AccountDetailComponent,
    data: { kind: 'ftc' }
  },
  {
    path: 'wx/:id',
    component: AccountDetailComponent,
    data: { kind: 'wechat' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReaderRoutingModule { }