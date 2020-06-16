import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './page/account-detail/account-detail.component';
import { ReaderHomeComponent } from './page/reader-home/reader-home.component';
import { ProfileComponent } from './component/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: ReaderHomeComponent,
  },
  {
    path: 'ftc/:id',
    component: AccountDetailComponent,
    data: { kind: 'ftc' },
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      }
    ]
  },
  {
    path: 'wechat/:id',
    component: AccountDetailComponent,
    data: { kind: 'wechat' }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReaderRoutingModule { }
