import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { ReaderHomeComponent } from './reader-home/reader-home.component';
import { MembershipComponent } from './membership/membership.component';
import { EditMembershipComponent } from './edit-membership/edit-membership.component';
import { ProfileComponent } from './profile/profile.component';


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
        path: 'create-subscription',
        component: MembershipComponent,
      },
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
